import Modal from 'react-modal'
import ModalProps from '../../interfaces/modal.props.interface'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { selectModalCreateEmployee } from '../../store/selectors'
import * as modalCreateEmployeeActions from '../../features/modalCreateEmployee'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    boxShadow: '0 0 10px #000',
    width: '70%',
    maxWidth: '500px',
    border: 'none',
    overflow: 'inherit',
  },
}
Modal.setAppElement('#root')

function MyModal(props: ModalProps) {
  let closeButton: HTMLSpanElement | null
  let modalMessage: HTMLSpanElement | null

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (closeButton) {
      closeButton.style.position = 'absolute'
      closeButton.style.top = '-12.5px'
      closeButton.style.right = '-12.5px'
      closeButton.style.display = 'block'
      closeButton.style.width = '30px'
      closeButton.style.height = '30px'
      closeButton.style.textIndent = '-9999px'
      closeButton.style.backgroundSize = 'contain'
      closeButton.style.backgroundRepeat = 'no-repeat'
      closeButton.style.backgroundPosition = 'center center'
      closeButton.style.backgroundImage =
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA3hJREFUaAXlm8+K00Acx7MiCIJH/yw+gA9g25O49SL4AO3Bp1jw5NvktC+wF88qevK4BU97EmzxUBCEolK/n5gp3W6TTJPfpNPNF37MNsl85/vN/DaTmU6PknC4K+pniqeKJ3k8UnkvDxXJzzy+q/yaxxeVHxW/FNHjgRSeKt4rFoplzaAuHHDBGR2eS9G54reirsmienDCTRt7xwsp+KAoEmt9nLaGitZxrBbPFNaGfPloGw2t4JVamSt8xYW6Dg1oCYo3Yv+rCGViV160oMkcd8SYKnYV1Nb1aEOjCe6L5ZOiLfF120EjWhuBu3YIZt1NQmujnk5F4MgOpURzLfAwOBSTmzp3fpDxuI/pabxpqOoz2r2HLAb0GMbZKlNV5/Hg9XJypguryA7lPF5KMdTZQzHjqxNPhWhzIuAruOl1eNqKEx1tSh5rfbxdw7mOxCq4qS68ZTjKS1YVvilu559vWvFHhh4rZrdyZ69Vmpgdj8fJbDZLJpNJ0uv1cnr/gjrUhQMuI+ANjyuwftQ0bbL6Erp0mM/ny8Fg4M3LtdRxgMtKl3jwmIHVxYXChFy94/Rmpa/pTbNUhstKV+4Rr8lLQ9KlUvJKLyG8yvQ2s9SBy1Jb7jV5a0yapfF6apaZLjLLcWtd4sNrmJUMHyM+1xibTjH82Zh01TNlhsrOhdKTe00uAzZQmN6+KW+sDa/JD2PSVQ873m29yf+1Q9VDzfEYlHi1G5LKBBWZbtEsHbFwb1oYDwr1ZiF/2bnCSg1OBE/pfr9/bWx26UxJL3ONPISOLKUvQza0LZUxSKyjpdTGa/vDEr25rddbMM0Q3O6Lx3rqFvU+x6UrRKQY7tyrZecmD9FODy8uLizTmilwNj0kraNcAJhOp5aGVwsAGD5VmJBrWWbJSgWT9zrzWepQF47RaGSiKfeGx6Szi3gzmX/HHbihwBser4B9UJYpFBNX4R6vTn3VQnez0SymnrHQMsRYGTr1dSk34ljRqS/EMd2pLQ8YBp3a1PLfcqCpo8gtHkZFHKkTX6fs3MY0blKnth66rKCnU0VRGu37ONrQaA4eZDFtWAu2fXj9zjFkxTBOo8F7t926gTp/83Kyzzcy2kZD6xiqxTYnHLRFm3vHiRSwNSjkz3hoIzo8lCKWUlg/YtGs7tObunDAZfpDLbfEI15zsEIY3U/x/gHHc/G1zltnAgAAAABJRU5ErkJggg==')"
    }
    if (modalMessage) {
      modalMessage.style.textAlign = 'left'
    }
  }

  const dispatch = useDispatch()
  const isOpen = useSelector(selectModalCreateEmployee)

  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(isOpen)
  }, [isOpen])

  function closeModal() {
    dispatch(modalCreateEmployeeActions.set(false))
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={props.ariaLabel}
      aria={{
        labelledby: 'modal_message',
      }}
    >
      <a
        href="/#"
        ref={(_closeButton) => (closeButton = _closeButton)}
        onClick={closeModal}
      >
        Close
      </a>
      <div
        id="modal_message"
        ref={(_modalMessage) => (modalMessage = _modalMessage)}
      >
        {props.textContent}
      </div>
    </Modal>
  )
}
export default MyModal
