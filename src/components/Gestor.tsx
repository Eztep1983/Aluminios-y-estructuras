import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X, Check, Loader2, FileImage, Trash2, Plus, Save, Database } from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface ProjectImage {
  file: File;
  preview: string;
  url?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

interface Project {
  id?: string;
  name: string;
  description: string;
  category: string;
  images: ProjectImage[];
  galleryImages?: string[];
  createdAt?: Date;
}

interface SavedProject {
  id: string;
  name: string;
  description: string;
  category: string;
  galleryImages: string[];
  createdAt: Date;
}

export function CloudinaryProjectManager() {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const { toast } = useToast();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';  

  const createNewProject = () => {
    const newProject: Project = {
      name: '',
      description: '',
      category: '',
      images: [],
    };
    setCurrentProject(newProject);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentProject) return;
    
    const files = Array.from(e.target.files || []);
    const newImages: ProjectImage[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending'
    }));
    
    setCurrentProject({
      ...currentProject,
      images: [...currentProject.images, ...newImages]
    });
  };

  const removeImage = (index: number) => {
    if (!currentProject) return;
    
    const newImages = [...currentProject.images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    
    setCurrentProject({
      ...currentProject,
      images: newImages
    });
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Error al subir imagen');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const projectsRef = collection(db, 'projects');
      const snapshot = await getDocs(projectsRef);
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SavedProject[];
      setSavedProjects(projects);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los proyectos",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleSaveProject = async () => {
    if (!currentProject) return;

    if (!currentProject.name || !currentProject.description) {
      toast({
        title: "Error",
        description: "Por favor completa nombre y descripción del proyecto",
        variant: "destructive",
      });
      return;
    }

    if (!cloudName || !uploadPreset) {
      toast({
        title: "Error",
        description: "Por favor completa Cloud Name y Upload Preset",
        variant: "destructive",
      });
      return;
    }

    if (currentProject.images.length === 0) {
      toast({
        title: "Error",
        description: "Agrega al menos una imagen al proyecto",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const urls: string[] = [];
    const updatedImages = [...currentProject.images];

    // Subir imágenes a Cloudinary
    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i].status === 'success' && updatedImages[i].url) {
        urls.push(updatedImages[i].url!);
        continue;
      }

      updatedImages[i].status = 'uploading';
      setCurrentProject({ ...currentProject, images: updatedImages });

      try {
        const url = await uploadToCloudinary(updatedImages[i].file);
        urls.push(url);
        updatedImages[i].status = 'success';
        updatedImages[i].url = url;
        setCurrentProject({ ...currentProject, images: updatedImages });
      } catch (error) {
        updatedImages[i].status = 'error';
        setIsUploading(false);
        toast({
          title: "Error",
          description: `Error al subir ${updatedImages[i].file.name}`,
          variant: "destructive",
        });
        return;
      }
    }

    // Guardar en Firebase
    try {
      const projectData = {
        name: currentProject.name,
        description: currentProject.description,
        category: currentProject.category,
        galleryImages: urls,
        createdAt: new Date(),
      };

      if (currentProject.id) {
        // Actualizar proyecto existente
        const projectRef = doc(db, 'projects', currentProject.id);
        await updateDoc(projectRef, projectData);
        toast({
          title: "¡Actualizado!",
          description: `Proyecto "${currentProject.name}" actualizado correctamente`,
        });
      } else {
        // Crear nuevo proyecto
        await addDoc(collection(db, 'projects'), projectData);
        toast({
          title: "¡Guardado!",
          description: `Proyecto "${currentProject.name}" guardado en Firebase con ${urls.length} imágenes`,
        });
      }

      setCurrentProject(null);
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar en Firebase",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const editProject = (project: SavedProject) => {
    const editableProject: Project = {
      id: project.id,
      name: project.name,
      description: project.description,
      category: project.category,
      images: project.galleryImages.map((url, index) => ({
        file: new File([], `existing-${index}`),
        preview: url,
        url: url,
        status: 'success' as const
      })),
      galleryImages: project.galleryImages,
    };
    setCurrentProject(editableProject);
  };

  const deleteProject = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      toast({
        title: "Eliminado",
        description: "Proyecto eliminado correctamente",
      });
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el proyecto",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestor de Proyectos del tio TALOS</h1>
          <p className="text-muted-foreground">
            Administra tus proyectos con Cloudinary y Firebase
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadProjects} variant="outline" disabled={isLoadingProjects}>
            {isLoadingProjects ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={createNewProject} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Configuración de Cloudinary */}
      <Card style={{display:"none"}}>
        <CardHeader>
          <CardTitle className="text-lg">Configuración de Cloudinary</CardTitle>
          <CardDescription>
            Configura estas credenciales una sola vez
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cloudName">Cloud Name</Label>
              <Input
                id="cloudName"
                value={cloudName}
                onChange={ (e) => {} }
                placeholder="tu-cloud-name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="uploadPreset">Upload Preset</Label>
              <Input
                id="uploadPreset"
                value={uploadPreset}
                onChange={(e) => {}}
                placeholder="tu-upload-preset"
                className="mt-1.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor de proyecto actual */}
      {currentProject && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {currentProject.id ? `Editando: ${currentProject.name}` : 'Nuevo Proyecto'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentProject(null)}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Información del proyecto */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Nombre del Proyecto *</Label>
                <Input
                  id="projectName"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({
                    ...currentProject,
                    name: e.target.value
                  })}
                  placeholder="Ej: Casa Moderna en el Centro"
                  className="mt-1.5"
                  disabled={isUploading}
                />
              </div>

              <div>
                <Label htmlFor="projectCategory">Categoría</Label>
                <Input
                  id="projectCategory"
                  value={currentProject.category}
                  onChange={(e) => setCurrentProject({
                    ...currentProject,
                    category: e.target.value
                  })}
                  placeholder="Ej: Residencial, Comercial, Remodelación"
                  className="mt-1.5"
                  disabled={isUploading}
                />
              </div>

              <div>
                <Label htmlFor="projectDescription">Descripción *</Label>
                <Textarea
                  id="projectDescription"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({
                    ...currentProject,
                    description: e.target.value
                  })}
                  placeholder="Describe el proyecto, materiales utilizados, características especiales..."
                  rows={4}
                  className="mt-1.5"
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Subida de imágenes */}
            <div className="space-y-4">
              <Label>Imágenes del Proyecto *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload-current"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload-current" className={isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}>
                  <FileImage className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Click para agregar imágenes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Puedes seleccionar múltiples archivos
                  </p>
                </label>
              </div>

              {/* Vista previa de imágenes */}
              {currentProject.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentProject.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-lg overflow-hidden border-2"
                    >
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      <div className={`absolute inset-0 flex items-center justify-center ${
                        image.status === 'uploading' ? 'bg-black/70' :
                        image.status === 'success' ? 'bg-green-500/20' :
                        image.status === 'error' ? 'bg-red-500/20' : ''
                      }`}>
                        {image.status === 'uploading' && (
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        )}
                        {image.status === 'success' && (
                          <Check className="w-8 h-8 text-green-500" />
                        )}
                        {image.status === 'error' && (
                          <X className="w-8 h-8 text-red-500" />
                        )}
                      </div>

                      {!isUploading && (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleSaveProject}
              disabled={isUploading}
              className="w-full"
              size="lg"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Subiendo a Cloudinary y guardando en Firebase...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {currentProject.id ? 'Actualizar Proyecto' : 'Guardar Proyecto en Firebase'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lista de proyectos guardados */}
      {savedProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Proyectos en Firebase ({savedProjects.length})</CardTitle>
            <CardDescription>
              Proyectos almacenados en tu base de datos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Imagen principal */}
                      {project.galleryImages[0] && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={project.galleryImages[0]}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Info del proyecto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">
                          {project.name}
                        </h3>
                        {project.category && (
                          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium mt-1">
                            {project.category}
                          </span>
                        )}
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {project.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {project.galleryImages.length} imágenes
                        </p>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editProject(project)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProject(project.id, project.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instrucciones */}
      {savedProjects.length === 0 && !currentProject && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📝 Cómo usar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>1.</strong> Click en "Nuevo Proyecto"</p>
            <p><strong>2.</strong> Completa nombre, categoría y descripción</p>
            <p><strong>3.</strong> Agrega las imágenes del proyecto</p>
            <p><strong>4.</strong> Click en "Guardar Proyecto"</p>
            <p><strong>5.</strong> Las imágenes se subirán y el proyecto se guardará automáticamente</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}