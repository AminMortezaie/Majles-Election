import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Modal } from "semantic-ui-react";

class People extends Component {
  constructor() {
    super();
    this.state = {
      title: "جدول مردم ",
      people: [],
      show: false,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentWillMount() {
    var that = this;
    console.log("component mounted!");
    fetch("http://localhost:3000/api/show-people").then(function(response) {
      response.json().then(function(data) {
        that.setState({ people: data });
        console.log("people", that.state.people);
      });
    });
  }

  addPeople(event) {
    event.preventDefault();
    let data = {
        national_id: this.refs.national_id.value,
        region_number: this.refs.region_number.value,
        age: this.refs.age.value,
        name: this.refs.name.value,
        family: this.refs.family.value
    };

    var request = new Request("http://localhost:3000/api/new-people", {
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
  removePeople(id) {
    console.log(id);
    let people = this.state.people;
    people.find(function(reg) {
      return reg.people_number === id;
    });
    var request = new Request(
      "http://localhost:3000/api/remove-people/" + id,
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

  showPeople() {
    var that = this;
    fetch("http://localhost:3000/api/show-people").then(function(response) {
      response.json().then(function(data) {
        console.log(that.state.people);
        that.setState({ people: data });
      });
    });
  }

  addPeopleDiv() {
    let { show } = this.state;
    if (show) {
      return (
        <Container className={"myfont search"}>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="national_id"
              placeholder="کد ملی "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="name"
              placeholder="نام  "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="family"
              placeholder="نام خانوادگی "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="region_number"
              placeholder="شماره منطقه "
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="age"
              placeholder="سن "
            />
          </div>
          
        </Container>
      );
    }
  }

  render() {
    var { title, people } = this.state;
    return (
      <div>
        <h1 className={"myfont text-center"}>{title}</h1>

        <Container>
          <table class="ui celled definition compact table">
            <thead class="">
              <tr class="text-center">
                <th class="myfont">کد ملی</th>
                <th class="myfont">شماره منطقه </th>
                <th class="myfont">نام </th>
                <th class="myfont"> نام خانوادگی </th>
                <th class="myfont">سن</th>
                <th class="myfont">حذف رای دهنده </th>
                
              </tr>
            </thead>
            <tbody class="text-center">
              {people.map(people => (
                <tr>
                  <td>{people.national_id}</td>
                  <td>{people.region_number}</td>
                  <td>{people.age}</td>
                  <td>{people.name}</td>
                  <td>{people.family}</td>
                  <td>
                    <button
                      class="ui small icon red right floated right labeled button myfont item-center"
                      onClick={this.removePeople.bind(
                        this,
                        people.national_id
                      )}
                    >
                      {console.log(people.national_id)}
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
                <th colspan="8" class="">
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
                          افزودن رای دهنده
                        </span>
                      </button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                    size="small"
                  >
                    <Header >
                      <span className={"myfont item-center" }>افزودن رای دهنده</span>
                    </Header>
                    <Modal.Content>{this.addPeopleDiv()}</Modal.Content>
                    <Modal.Actions>
                      <button
                        class="ui  icon secondary  right labeled button item-center"
                        onClick={event => {
                          this.addPeople(event);
                          this.setState({modalOpen:false})
                          this.showPeople()
                          this.addPeopleDiv()
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
export default People;
