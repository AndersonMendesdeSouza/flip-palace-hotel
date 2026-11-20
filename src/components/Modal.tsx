import { useEffect, useRef } from 'react'
import type { KeyboardEventHandler, ReactNode } from 'react'
import Icon from './Icon'
import type { Photo } from '../data/hotel'

export function Modal({
  children,
  label,
  onClose,
  className = '',
  onKeyDown,
}: {
  children: ReactNode
  label: string
  onClose: () => void
  className?: string
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-label={label}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="round-button modal-close"
        type="button"
        aria-label="Fechar janela"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  )
}

export function ImageViewer({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const photo = photos[index]
  function move(direction: number) {
    onChange((index + direction + photos.length) % photos.length)
  }

  return (
    <Modal
      label="Galeria de fotos"
      onClose={onClose}
      className="image-viewer"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          move(-1)
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          move(1)
        }
      }}
    >
      <div className="viewer-content">
        <img src={photo.src} alt={photo.alt} />
        <button
          className="round-button viewer-prev"
          type="button"
          aria-label="Foto anterior"
          onClick={() => move(-1)}
        >
          <Icon name="left" />
        </button>
        <button
          className="round-button viewer-next"
          type="button"
          aria-label="Próxima foto"
          onClick={() => move(1)}
        >
          <Icon name="right" />
        </button>
        <div className="viewer-caption" aria-live="polite">
          <span>
            {photo.alt}
            {photo.illustrative ? ' · Imagem ilustrativa' : ''}
          </span>
          <span>
            {index + 1} / {photos.length}
          </span>
        </div>
      </div>
    </Modal>
  )
}
