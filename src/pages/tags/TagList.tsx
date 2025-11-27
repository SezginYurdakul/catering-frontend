import { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import EmptyState from '@/components/common/EmptyState'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import tagService from '@/api/tag.service'
import { Tag } from '@/types/tag.types'
import toast from 'react-hot-toast'

export default function TagList() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  const [tagName, setTagName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    try {
      setLoading(true)
      const data = await tagService.getTags()
      setTags(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load tags')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedTag(null)
    setTagName('')
    setIsFormOpen(true)
  }

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag)
    setTagName(tag.name)
    setIsFormOpen(true)
  }

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag)
    setIsDeleteModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tagName.trim()) {
      toast.error('Tag name is required')
      return
    }

    try {
      setIsSubmitting(true)
      if (selectedTag) {
        await tagService.updateTag(selectedTag.id, { name: tagName })
        toast.success('Tag updated successfully')
      } else {
        await tagService.createTag({ name: tagName })
        toast.success('Tag created successfully')
      }
      setIsFormOpen(false)
      loadTags()
    } catch (error: any) {
      toast.error(error.message || 'Operation failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!selectedTag) return

    try {
      setIsDeleting(true)
      await tagService.deleteTag(selectedTag.id)
      toast.success('Tag deleted successfully')
      setIsDeleteModalOpen(false)
      loadTags()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete tag')
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading tags..." />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Tag
        </Button>
      </div>

      <Card>
        {tags.length === 0 ? (
          <EmptyState
            title="No tags yet"
            description="Get started by adding a new tag"
            action={
              <Button onClick={handleCreate}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Tag
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full"
              >
                <span className="font-medium text-gray-900 break-words max-w-[60vw] sm:max-w-full">{tag.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedTag ? 'Edit Tag' : 'New Tag'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            required
            autoFocus
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {selectedTag ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Tag"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{selectedTag?.name}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} isLoading={isDeleting}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
