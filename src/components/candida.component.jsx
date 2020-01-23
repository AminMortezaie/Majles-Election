import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Modal } from "semantic-ui-react";

class Candida extends Component {
  constructor() {
    super();
    this.state = {
      title: "جدول کاندیدا",
      candida: [],
      show: false,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentWillMount() {
    var that = this;
    console.log("component mounted!");
    fetch("http://localhost:3000/api/show-candida").then(function(response) {
      response.json().then(function(data) {
        that.setState({ candida: data });
        console.log("candida", that.state.candida);
      });
    });
  }

  addCandida(event) {
    event.preventDefault();
    let data = {
      candida_id: this.refs.candida_id.value,
      name: this.refs.name.value,
      family: this.refs.family.value,
      phoneNumber: this.refs.phonenumber.value,
      email: this.refs.email.value,
      regionNumber: this.refs.regionnumber.value,
      shoraNegahbanNumber: this.refs.shora_negahban_number.value,
      age: this.refs.age.value
    };

    var request = new Request("http://localhost:3000/api/new-candida", {
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

  
  removeCandida(id) {
    console.log(id);
    let candida = this.state.candida;
    candida.find(function(candid) {
      return candid.candida_id === id;
    });
    var request = new Request(
      "http://localhost:3000/api/remove-candida/" + id,
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

  showCandida() {
    var that = this;
    fetch("http://localhost:3000/api/show-candida").then(function(response) {
      response.json().then(function(data) {
        console.log(that.state.candida);
        that.setState({ candida: data });
      });
    });
  }

  addCandidaDiv() {
    let { show } = this.state;
    if (show) {
      return (
        <Container className={"myfont search"}>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="candida_id"
              placeholder="شماره کاندیدا"
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
              ref="family"
              placeholder="نام خانوادگی"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="phonenumber"
              placeholder="شماره تلفن"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="email"
              placeholder="ایمیل"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="regionnumber"
              placeholder="شماره منطقه"
            />
          </div>

          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="shora_negahban_number"
              placeholder="کد شورای نگهبان"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="age"
              placeholder="سن کاندیدا"
            />
          </div>
        </Container>
      );
    }
  }

  showCandidaBox = () => {
    if (this.state.showCandidaBox) {
      return (
        <div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="candida_id_remove"
              placeholder="شماره کاندیدا"
            />
          </div>
        </div>
      );
    }
  };

  render() {
    var { title, candida } = this.state;
    return (
      <div>
        <h1 className={"myfont text-center"}>{title}</h1>
        <Container>
          <table class="ui celled definition compact table">
            <thead class="">
              <tr class="text-center">
                <th class="myfont"></th>
                <th class="myfont">نام</th>
                <th class="myfont">نام خانوادگی</th>
                <th class="myfont">شماره تلفن</th>
                <th class="myfont">ایمیل</th>
                <th class="myfont">شماره منطقه</th>
                <th class="myfont">حذف کاندیدا</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {candida.map(candid => (
                <tr>
                  <td>{candid.candida_id}</td>
                  <td>{candid.name}</td>
                  <td>{candid.family}</td>
                  <td>{candid.phonenumber}</td>
                  <td>{candid.email}</td>
                  <td>{candid.region_number}</td>
                  <td>
                    <button
                      class="ui small icon red right floated right labeled button myfont item-center"
                      onClick={e => this.removeCandida(candid.candida_id)}
                    >
                      {console.log(candid.candida_id)}
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
                          افزودن کاندیدا
                        </span>
                      </button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                    size="small"
                  >
                    <Header icon="browser">
                      <span className={"myfont item-center"}>
                        افزودن کاندیدا
                      </span>
                    </Header>
                    <Modal.Content>{this.addCandidaDiv()}</Modal.Content>
                    <Modal.Actions>
                      <button
                        class="ui  icon secondary  right labeled button item-center"
                        onClick={event => {
                          this.addCandida(event);
                        }}
                      >
                        <i aria-hidden="true" class="user icon"></i>
                        <span className={"myfont"}>اضافه کن</span>
                      </button>
                    </Modal.Actions>
                  </Modal>
                  {this.showCandidaBox()}
                </th>
              </tr>
            </tfoot>
          </table>
        </Container>
      </div>
    );
  }
}
export default Candida;
