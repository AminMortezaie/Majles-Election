import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Modal } from "semantic-ui-react";

class Madrak extends Component {
  constructor() {
    super();
    this.state = {
      title: "جدول مدارک ",
      madrak: [],
      show: false,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentWillMount() {
    var that = this;
    console.log("component mounted!");
    fetch("http://localhost:3000/api/show-madrak").then(function(response) {
      response.json().then(function(data) {
        that.setState({ madrak: data });
        console.log("madrak", that.state.madrak);
      });
    });
  }

  addMadrak(event) {
    event.preventDefault();
    let data = {
      madrak_number: this.refs.madrak_number.value,
      madrak_tahsili: this.refs.madrak_tahsili.value,
      gerayesh: this.refs.gerayesh.value
    };

    var request = new Request("http://localhost:3000/api/new-madrak", {
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
  removeMadrak(id) {
    console.log(id);
    let madrak = this.state.madrak;
    madrak.find(function(reg) {
      return reg.madrak_number === id;
    });
    var request = new Request(
      "http://localhost:3000/api/remove-madrak/" + id,
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

  showMadrak() {
    var that = this;
    fetch("http://localhost:3000/api/show-madrak").then(function(response) {
      response.json().then(function(data) {
        console.log(that.state.madrak);
        that.setState({ madrak: data });
      });
    });
  }

  addMadrakDiv() {
    let { show } = this.state;
    if (show) {
      return (
        <Container className={"myfont search"}>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="madrak_number"
              placeholder="شماره مدرک"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="madrak_tahsili"
              placeholder="مدرک تحصیلی"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="gerayesh"
              placeholder="گرایش "
            />
          </div>
        </Container>
      );
    }
  }

  render() {
    var { title, madrak } = this.state;
    return (
      <div>
        <h1 className={"myfont text-center"}>{title}</h1>

        <Container>
          <table class="ui celled definition compact table">
            <thead class="">
              <tr class="text-center">
                <th class="myfont"></th>
                <th class="myfont">مدرک تحصیلی </th>
                <th class="myfont">گرایش</th>
                <th class="myfont">حذف مدرک</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {madrak.map(madrak => (
                <tr>
                  <td>{madrak.madrak_number}</td>
                  <td>{madrak.madrak_tahsili}</td>
                  <td>{madrak.gerayesh}</td>
                  <td>
                    <button
                      class="ui small icon red right floated right labeled button myfont item-center"
                      onClick={this.removeMadrak.bind(
                        this,
                        madrak.madrak_number
                      )}
                    >
                      {console.log(madrak.madrak_number)}
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
                          افزودن مدرک
                        </span>
                      </button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                    size="small"
                  >
                    <Header icon="browser">
                      <span className={"myfont item-center"}>افزودن مدرک</span>
                    </Header>
                    <Modal.Content>{this.addMadrakDiv()}</Modal.Content>
                    <Modal.Actions>
                      <button
                        class="ui  icon secondary  right labeled button item-center"
                        onClick={event => {
                          this.addMadrak(event);
                          this.setState({modalOpen:false})
                          this.showMadrak()
                          this.addMadrakDiv()
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
export default Madrak;
