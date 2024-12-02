import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CirclePlus } from 'lucide-react';
import { useMovieStore } from '@/store';
import { Input } from './ui/input';
import { Button } from './ui/button';

function AddGenreDialog({updateGenres}) {

    const {user} = useMovieStore()

    const [isOpen, setIsOpen] = useState(true)
    const [genreName, setGenreName] = useState("")

    const onSubmit = async() => {
        const response = await fetch("http://localhost:5000/api/genre/", {
            method: "POST",
            body: JSON.stringify({genreName}),
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(json._id) {
            setIsOpen(true)
            updateGenres()
        }
    }

  return (
    <Dialog
      open={!isOpen}
      onOpenChange={(open) => {
        setIsOpen(!open);
      }}
    >
      <DialogTrigger>
        <CirclePlus className="cursor-pointer" size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Genre</DialogTitle>

          <DialogDescription>
            <p className="text-sm mt-4 my-1 text-primaryDark">
              Genre
            </p>
            <Input
              type="text"
              placeholder="Crime"
              onChange={(e) => setGenreName(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="mt-4 bg-secondaryOrange hover:bg-primaryDark w-1/3"
            onClick={onSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddGenreDialog