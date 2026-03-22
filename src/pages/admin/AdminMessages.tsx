import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";

export default function AdminMessages() {
  const qc = useQueryClient();
  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => { const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }); return data ?? []; },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => { await supabase.from("contact_messages").update({ is_read: true }).eq("id", id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { await supabase.from("contact_messages").delete().eq("id", id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-messages"] }); toast.success("Deleted"); },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="space-y-3 max-w-3xl">
        {(messages ?? []).map((m) => (
          <div key={m.id} className={`p-5 bg-card rounded-xl border transition-all ${m.is_read ? "border-border" : "border-primary/30 bg-primary/2"}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-sm">{m.name} <span className="font-normal text-muted-foreground">({m.email})</span></p>
                {m.subject && <p className="text-xs text-muted-foreground mt-0.5">{m.subject}</p>}
              </div>
              <div className="flex items-center gap-1">
                {!m.is_read && (
                  <button onClick={() => markRead.mutate(m.id)} className="p-2 rounded-lg text-primary hover:bg-primary/8 transition-colors" title="Mark as read">
                    <Check size={14} />
                  </button>
                )}
                <button onClick={() => { if (confirm("Delete?")) deleteMut.mutate(m.id); }} className="p-2 rounded-lg text-destructive hover:bg-destructive/8 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{m.message}</p>
            <p className="text-xs text-muted-foreground mt-3">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        ))}
        {(messages ?? []).length === 0 && <p className="text-center text-muted-foreground py-10">No messages yet.</p>}
      </div>
    </div>
  );
}
