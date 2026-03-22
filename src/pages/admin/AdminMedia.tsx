import { toast } from "sonner";

export default function AdminMedia() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Media Library</h1>
      <p className="text-sm text-muted-foreground mb-6">Upload and manage images and media files. Use the URLs in your content fields.</p>
      <div className="bg-card rounded-xl border border-border p-10 text-center">
        <p className="text-muted-foreground">Media upload functionality is available through the image URL fields in each content section. Upload images to the Cloud storage bucket and use the generated URLs.</p>
      </div>
    </div>
  );
}
