import React, { Fragment } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

function Contacts() {
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
          <div>list of contacts</div>
        </div>
      </div>
    </Fragment>
  );
}

export default Contacts;
