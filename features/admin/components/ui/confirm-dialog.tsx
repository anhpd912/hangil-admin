"use client";

import { Button } from "./button";
import { Drawer } from "./drawer";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Drawer open={open} onClose={onCancel} title={title}>
      <p className="text-dark">{message}</p>
      <div className="mt-6 flex gap-2">
        <Button variant="primary" onClick={onConfirm}>
          Xác nhận
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Huỷ
        </Button>
      </div>
    </Drawer>
  );
}
