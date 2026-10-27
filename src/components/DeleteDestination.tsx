'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

type DeleteDestinationDialogueProps = {
  id: string;
};

const DeleteDestinationDialouge = ({
  id,
}: DeleteDestinationDialogueProps) => {
    const handleDeleteDestination = async() => {
        const res = await fetch(`http://localhost:8000/destination/${id}`,{
            method: 'DELETE',
        })
        
         if (!res.ok) {
      throw new Error("Failed to delete destination");
    }

    redirect("/destination");
    
    };
    return (
        <div>
            <AlertDialog>
  <AlertDialogTrigger render={<button className="flex items-center gap-2 border border-red-200 px-4 py-2 text-xs text-red-500 hover:bg-red-50">
            <Trash2 size={13} />
            Delete
          </button>}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialouge;