import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Modal } from "semantic-ui-react";

class Gerayesh extends Component {
  constructor() {
    super();
    this.state = {
      title: "جدول گرایش های حزبی",
      gerayesh: [],
      show: false,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentWillMount() {
    var that = this;
    console.log("component mounted!");
    fetch("http://localhost:3000/api/show-gerayesh").then(function(response) {
      response.json().then(function(data) {
        that.setState({ gerayesh: data });
        console.log("gerayesh", that.state.gerayesh);
      });
    });
  }

  addGerayesh(event) {
    event.preventDefault();
    let data = {
      gerayesh_number: this.refs.gerayesh_number.value,
      name: this.refs.name.value,
      gerayesh_duration: this.refs.gerayesh_duration.value,
      hezb_kind: this.refs.hezb_kind.value,
      position: this.refs.position.value
    };

    var request = new Request("http://localhost:3000/api/new-gerayesh", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });
    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  }
  removeGerayesh(id) {
    console.log(id);
    let gerayesh = this.state.gerayesh;
    gerayesh.find(function(reg) {
      return reg.gerayesh_number === id;
    });
    var request = new Request(
      "http://localhost:3000/api/remove-gerayesh/" + id,
      {
        method: "DELETE"
      }
    );

    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  }

  showGerayesh() {
    var that = this;
    fetch("http://localhost:3000/api/show-gerayesh").then(function(response) {
      response.json().then(function(data) {
        console.log(that.state.gerayesh);
        that.setState({ gerayesh: data });
      });
    });
  }

  addGerayeshDiv() {
    let { show } = this.state;
    if (show) {
      return (
        <Container className={"myfont search"}>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="gerayesh_number"
              placeholder="شماره گرایش حزبی"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="name"
              placeholder="نام"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="gerayesh_duration"
              placeholder="مدت زمان حضور "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="hezb_kind"
              placeholder="نوع حزب "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="position"
              placeholder="سمت"
            />
          </div>
        </Container>
      );
    }
  }

  render() {
    var { title, gerayesh } = this.state;
    return (
      <div>
        <h1 className={"myfont text-center"}>{title}</h1>

        <Container>
          <table class="ui celled definition compact table">
            <thead class="">
              <tr class="text-center">
                <th class="myfont"></th>
                <th class="myfont">نام </th>
                <th class="myfont">نوع حزب</th>
                <th class="myfont">مدت زمان حضور </th>
                <th class="myfont">سمت</th>
                <th class="myfont">حذف گرایش حزبی</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {gerayesh.map(gerayesh => (
                <tr>
                  <td>{gerayesh.gerayesh_number}</td>
                  <td>{gerayesh.name}</td>
                  <td>{gerayesh.gerayesh_duration}</td>
                  <td>{gerayesh.hezb_kind}</td>
                  <td>{gerayesh.position }</td>
                  <td>
                    <button
                      class="ui small icon red right floated right labeled button myfont item-center"
                      onClick={this.removeGerayesh.bind(
                        this,
                        gerayesh.gerayesh_number
                      )}
                    >
                      {console.log(gerayesh.gerayesh_number)}
                      <i aria-hidden="true" class="remove icon"></i>
                      <span className={"myfont"}>حذف</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="full-width">
              <tr class="">
                <th class=""></th>
                <th colspan="6" class="">
                  <Modal
                    trigger={
                      <button
                        class="ui small icon primary right floated left labeled button myfont"
                        onClick={() =>
                          this.setState({ show: true, modalOpen: true })
                        }
                      >
                        <i aria-hidden="true" class="user icon"></i>
                        <span className={"myfont text-center"}>
                          افزودن گرایش حزبی
                        </span>
                      </button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                    size="small"
                  >
                    <Header icon="browser">
                      <span className={"myfont item-center"}>افزودن گرایش حزبی</span>
                    </Header>
                    <Modal.Content>{this.addGerayeshDiv()}</Modal.Content>
                    <Modal.Actions>
                      <button
                        class="ui  icon secondary  right labeled button item-center"
                        onClick={event => {
                          this.addGerayesh(event);
                        }}
                      >
                        <i aria-hidden="true" class="user icon"></i>
                        <span className={"myfont"}>اضافه کن</span>
                      </button>
                    </Modal.Actions>
                  </Modal>
                </th>
              </tr>
            </tfoot>
          </table>
        </Container>
      </div>
    );
  }
}
export default Gerayesh;
