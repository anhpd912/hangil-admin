"use client";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-dark/30">
      <div className="flex h-full w-full max-w-md flex-col gap-4 rounded-l-[2rem] border-l border-dark bg-parchment p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-dark">{title}</h2>
          <button onClick={onClose} className="font-mono-label text-sm text-muted">
            Đóng
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
