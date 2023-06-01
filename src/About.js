import { Component } from "react";

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    const developers = [
      { name: "Carl Sanders", role: " Frontend Developer" },
      { name: "Daron Faulkner", role: " Backend Developer" },
    ];

     return (
      <div>
        <h2>About the Developers</h2>
        {developers.map((developer, index) => (
          <div key={index}>
            <h3>{developer.name}</h3>
            <p>Role: {developer.role}</p>
          </div>
        ))}
        <p>
          This Page is about having a book search. You can upload your own books
          or even your favorite books. It is designed to save your preference
          style of books.
        </p>
      </div>
    );
  }
}


export default Profile;
