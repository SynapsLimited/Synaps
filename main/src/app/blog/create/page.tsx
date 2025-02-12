"use client"

import { useState, useContext, useEffect, useRef, type ChangeEvent, type FormEvent } from "react"
import { UserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  Indent,
  Outdent,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

const CreatePost = () => {
  const [title, setTitle] = useState<string>("")
  const [category, setCategory] = useState<string>("Uncategorized")
  const [description, setDescription] = useState<string>("")
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [error, setError] = useState<string>("")
  const editorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = description
    }
  }, [description])

  const POST_CATEGORIES = [
    "Uncategorized",
    "Marketing",
    "Business",
    "Technology",
    "AI",
    "Gaming",
    "Product",
    "Entertainment",
  ]

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const postData = new FormData()
    postData.set("title", title)
    postData.set("category", category)
    postData.set("description", description)
    if (thumbnail) {
      postData.append("thumbnail", thumbnail)
    }

    try {
      const response = await axios.post(`/api/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.status === 201) {
        router.push(`/blog/${response.data.slug}`)
      }
    } catch (err: any) {
      setError(err.response?.data.message || "An unexpected error occurred.")
    }
  }

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  const handleFormat = (command: string, value?: string) => {
    if (!editorRef.current) return

    editorRef.current.focus()

    if (command === "formatBlock") {
      document.execCommand("formatBlock", false, value)
    } else {
      document.execCommand(command, false, value)
    }

    const content = editorRef.current.innerHTML
    setDescription(content)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <section className="backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-4xl font-bold text-center text-background mb-8">Create Post</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={createPost}>
            {/* Title Input: behaves normally */}
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/10 border-gray-700 text-black placeholder:text-gray-400"
              autoFocus
              required
            />

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-white/10 border-gray-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="border border-gray-700 rounded-lg overflow-hidden bg-white/10">
              <div className="bg-white/5 p-2 flex flex-wrap gap-1 items-center border-b border-gray-700">
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("formatBlock", "p")}
                  className="data-[state=on]:bg-white/20"
                >
                  <Pilcrow className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("formatBlock", "h1")}
                  className="data-[state=on]:bg-white/20"
                >
                  <Heading1 className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("formatBlock", "h2")}
                  className="data-[state=on]:bg-white/20"
                >
                  <Heading2 className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("formatBlock", "h3")}
                  className="data-[state=on]:bg-white/20"
                >
                  <Heading3 className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("formatBlock", "h4")}
                  className="data-[state=on]:bg-white/20"
                >
                  <Heading4 className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
                <Toggle size="sm" onClick={() => handleFormat("bold")} className="data-[state=on]:bg-white/20">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" onClick={() => handleFormat("italic")} className="data-[state=on]:bg-white/20">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" onClick={() => handleFormat("underline")} className="data-[state=on]:bg-white/20">
                  <Underline className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
                <Toggle size="sm" onClick={() => handleFormat("justifyLeft")} className="data-[state=on]:bg-white/20">
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" onClick={() => handleFormat("justifyCenter")} className="data-[state=on]:bg-white/20">
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" onClick={() => handleFormat("justifyRight")} className="data-[state=on]:bg-white/20">
                  <AlignRight className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("insertUnorderedList")}
                  className="data-[state=on]:bg-white/20"
                >
                  <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  onClick={() => handleFormat("insertOrderedList")}
                  className="data-[state=on]:bg-white/20"
                >
                  <ListOrdered className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-700" />
                <Toggle size="sm" onClick={() => handleFormat("indent")} className="data-[state=on]:bg-white/20">
                  <Indent className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" onClick={() => handleFormat("outdent")} className="data-[state=on]:bg-white/20">
                  <Outdent className="h-4 w-4" />
                </Toggle>
              </div>
              <div
                ref={editorRef}
                className="min-h-[200px] p-4 focus:outline-none text-white font-sans text-base leading-relaxed"
                contentEditable
                onInput={(e: React.FormEvent<HTMLDivElement>) => {
                  setDescription(e.currentTarget.innerHTML)
                }}
              />
            </div>
            <div>
              <Input
                type="file"
                onChange={handleThumbnailChange}
                accept="image/png, image/jpg, image/jpeg"
                className="cursor-pointer bg-white/10 border-gray-700 text-white"
              />
            </div>
            <Button type="submit" className="w-full md:w-1/3 mx-auto block">
              Create
            </Button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default CreatePost
