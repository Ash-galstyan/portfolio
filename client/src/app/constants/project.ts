export interface Project {
    id: number;
    title: string;
    company?: string;
    intro?: string;
    stackUsed: string;
    previewImageSrc: string;
    description: string;
    link?: string;
}