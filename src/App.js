import React from "react";
import {
  Row,
  Col,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { Notes, Projects } from "./data";
import FontAwesome from "react-fontawesome";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      noteText: "",
      noteType: "",
      projectName: "",
      notes: Notes,
      projects: Projects,
      noteModal: false,
      projectModal: false,
      order: "All",
    };
  }

  onTextChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  renderNotes = (type) => {
    if (type === "All") {
      return this.state.notes.map((element, index) => {
        return (
          <ListGroupItem key={index} className="justify-content-between">
            <p>
              <Badge color="primary">{element.type}</Badge>{" "}
              {element.description}
            </p>
            <div>
              <span className="text-secondary">{element.created}</span>
              <Button
                color="link text-danger"
                id={element.id}
                onClick={(e) => {
                  this.deleteNote(e.target.id);
                }}
              >
                <FontAwesome name="remove" className="mr-2" />
                Remove
              </Button>
            </div>
          </ListGroupItem>
        );
      });
    } else {
      return this.state.notes.map((element, index) => {
        if (element.type === type)
          return (
            <ListGroupItem key={index} className="justify-content-between">
              <p>
                <Badge color="primary">{element.type}</Badge>{" "}
                {element.description}
              </p>
              <div>
                <span className="text-secondary">{element.created}</span>
                <Button
                  color="link text-danger"
                  id={element.id}
                  onClick={(e) => {
                    this.deleteNote(e.target.id);
                  }}
                >
                  <FontAwesome name="remove" className="mr-2" />
                  Remove
                </Button>
              </div>
            </ListGroupItem>
          );
      });
    }
  };

  renderProjects = () => {
    return this.state.projects.map((element, index) => {
      return (
        <div key={index}>
          <Button
            color="link"
            id={element.id}
            onClick={() => this.setState({ order: element.name })}
          >
            {element.name}
          </Button>
        </div>
      );
    });
  };

  deleteNote = (id) => {
    const { notes } = this.state;
    notes.splice(id, 1);
    this.setState({ notes: notes });
  };

  deleteProject = (id) => {
    const { projects } = this.state;
    projects.splice(id, 1);
    this.setState({ projects: projects });
  };
  noteToggle = () => this.setState({ noteModal: !this.state.noteModal });
  projectToggle = () =>
    this.setState({ projectModal: !this.state.projectModal });

  addNote = () => {
    const { noteText, noteType } = this.state;
    const noteId = this.state.notes.length;
    var date = new Date();
    this.state.notes.push({
      id: noteId,
      type: noteType,
      description: noteText,
      created: date.toLocaleString(),
    });
    this.noteToggle();
  };

  addProject = () => {
    const { projectName } = this.state;
    const projectId = this.state.projects.length;

    this.state.projects.push({
      id: projectId,
      name: projectName,
    });
    this.projectToggle();
  };
  render() {
    return (
      <div>
        <div className="bg-white py-0">
          <Row className="container justify-content-end mx-auto pb-0 shadow-lg ">
            <ul className="nav">
              <li className="nav-item">
                <Button
                  color="link"
                  className="nav-link"
                  onClick={this.noteToggle}
                >
                  <FontAwesome name="file" className="mr-2" /> New Note
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  color="link"
                  className="nav-link "
                  onClick={this.projectToggle}
                >
                  <FontAwesome name="folder" className="mr-2" /> New Project
                </Button>
              </li>
            </ul>
          </Row>
        </div>
        <div>
          <Modal isOpen={this.state.noteModal} toggle={this.noteToggle}>
            <ModalHeader toggle={this.noteToggle}>New Note</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="text">Text</Label>
                <Input
                  type="textarea"
                  name="noteText"
                  id="text"
                  placeholder="Write your note..."
                  onChange={this.onTextChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Selet the note project</Label>
                <Input
                  type="select"
                  name="noteType"
                  id="exampleSelect"
                  onChange={this.onTextChange}
                >
                  {this.state.projects.map((element, index) => {
                    return (
                      <option key={index} value={element.name}>
                        {element.name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.addNote}>
                Add
              </Button>{" "}
              <Button color="danger" onClick={this.noteToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.projectModal} toggle={this.projectToggle}>
            <ModalHeader toggle={this.projectToggle}>New project</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Name of the project"
                name="projectName"
                onChange={this.onTextChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.addProject}>
                Add
              </Button>{" "}
              <Button color="danger" onClick={this.projectToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <Row className="container mx-auto my-4">
          <Col lg="3" md="3" sm="3" xs="3">
            <ListGroup className="bg-transparent">
              <ListGroupItem className="justify-content-between border-0 bg-transparent ">
                <h6>
                  <FontAwesome name="calendar" className="mr-2" />
                  Recent
                </h6>
                <div>
                  <Button
                    color="link"
                    onClick={() => this.setState({ order: "All" })}
                  >
                    All
                  </Button>
                </div>
                <div>
                  <Button color="link">Today</Button>
                </div>
                <div>
                  <Button color="link">Last 7 day</Button>
                </div>
              </ListGroupItem>

              <ListGroupItem className="justify-content-between border-0 bg-transparent ">
                <h6>
                  <FontAwesome name="inbox" className="mr-2" />
                  Projects
                </h6>
                {this.renderProjects()}
              </ListGroupItem>
            </ListGroup>
            {this.state.notes.length === 0 ? this.noNotes : ""}
          </Col>
          <Col lg="9" md="9" sm="9" xs="9">
            <Row>
              <Col lg="12" md="12" sm="12" xs="12">
                <span className="h5 mb-3">{this.state.order}</span>
                <ListGroup>{this.renderNotes(this.state.order)}</ListGroup>
                {this.state.notes.length === 0 ? (
                  <div className="h5 text-center">Add Your Notes</div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
/* 
const Test = () => {
  const [notes, setNotes] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadNotes();
    loadProjects();
  }, []);

  const loadNotes = () => {
    setNotes(Notes);
  };

  const loadProjects = () => {
    setProjects(Projects);
  };

  const renderNotes = (type) => {
    return notes.map((element, index) => {
      return (
        <ListGroupItem key={index} className="justify-content-between">
          <p>
            <Badge color="primary">{element.type}</Badge> {element.description}
          </p>
          <div>
            <span className="text-secondary">{element.created}</span>
            <Button
              color="link text-danger"
              id={element.id}
              onClick={(e) => {
                deleteNote(e.target.id);
              }}
            >
              <FontAwesome name="remove" className="mr-2" />
              Remove
            </Button>
          </div>
        </ListGroupItem>
      );
    });
  };

  const renderProjects = () => {
    return projects.map((element, index) => {
      return (
        <div key={index}>
          <Button color="link" id={element.id}>
            {element.name}
          </Button>
        </div>
      );
    });
  };

  const deleteNote = (id) => {
    Notes.splice(id, 1);
    console.log(Notes);
    loadNotes();
  };

  const deleteProject = (e) => {
    return console.log(e);
  };

  const addNote = (e) => {
    console.log(e);
  };
};

export default Test;
 */
