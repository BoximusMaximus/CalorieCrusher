import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function CreateFood({show, onHide, foodData}:{show:boolean, onHide:any, foodData:Function}) {

    const testReturn = {test : "THIS IS A TEST LOLOLOL"}

    return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Header>
            <Modal.Title>Food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Food editing here</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>Close</Button>
            <Button variant='primary' onClick={() => foodData(testReturn)}>Save</Button>
        </Modal.Footer>
    </Modal>
  )
}
