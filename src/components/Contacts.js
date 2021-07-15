import React, { Fragment, useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

function Contacts() {

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.child('contacts').on('value', snapshot => {
        if (snapshot.val() != null) {
            setContactObjects({
                ...snapshot.val()
            });
        }
    })
}, [])

  const addOrEdit = (obj) => {
      firebaseDb.child('contacts').push(
          obj,
          err => {
              if (err)
              console.log(err)
          }
      )
  };
  return (
    <Fragment>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Contacts register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm addOrEdit={addOrEdit} />
        </div>
        <div className="col-md-7">
        <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map((key) => (
                                    <tr key={key}>
                                        <td>{contactObjects[key].fullName}</td>
                                        <td>{contactObjects[key].mobile}</td>
                                        <td>{contactObjects[key].email}</td>
                                        <td className="bg-light">
                                            {/* <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a> */}
                                               <a className="btn text-primary" >
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger">
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
        </div>
      </div>
    </Fragment>
  );
}

export default Contacts;
