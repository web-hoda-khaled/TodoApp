import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const SingleNote = ({ note, func }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
  async function deleteNote() {
    setIsLoading(true);
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (data.msg == "done") {
        func();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let singleNote = {
    title: note.title,
    content: note.content,
  };

  async function updateNote(values) {
    try {
      let { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (data.msg == "done") {
        func();

        handleClose();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: singleNote,
    onSubmit: updateNote,
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                id="title"
                type="text"
                className="form-control"
                placeholder="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </div>

            <div className="mt-3">
              <textarea
                id="content"
                className="form-control"
                rows={3}
                placeholder="content"
                onChange={formik.handleChange}
                value={formik.values.content}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                "Update Note"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="col-md-3">
        <div className=" shadow p-4 mb-5 noteBady rounded-4 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div className="d-flex ">
              <i
                onClick={handleShow}
                className="fa-solid fa-pen-to-square text-primary cursor-pointer me-5"
              ></i>
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                <i
                  onClick={deleteNote}
                  className="fa-solid fa-trash text-danger cursor-pointer"
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNote;
