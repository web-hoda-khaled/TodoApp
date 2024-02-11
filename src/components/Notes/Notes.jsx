import React, { useEffect, useState } from "react";
import SingleNote from "../SingleNote/SingleNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";

const Notes = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let note = {
    title: "",
    content: "",
  };

  async function addNote(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (data.msg == "done") {
        values.title = "";
        values.content = "";
        getAllNote();
        handleClose();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: note,
    onSubmit: addNote,
  });

  async function getAllNote() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (data.msg == "done") {
        setNotes(data.notes);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllNote();
  }, []);

  return (
    <>
      {/* Modal  */}
      <section className="mt-5">
        <div className="container">
          <Button variant="primary" className="mb-5" onClick={handleShow}>
            Add Note
          </Button>
          <Modal show={show} onHide={handleClose}>
            <form onSubmit={formik.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add Note</Modal.Title>
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
                    "Add Note"
                  )}
                </Button>
              </Modal.Footer>
            </form>
          </Modal>

          <div className="row g-3">
            {notes
              ? notes.map((note) => {
                  return <SingleNote note={note} func={getAllNote} />;
                })
              : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default Notes;
