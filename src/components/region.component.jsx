import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Modal } from "semantic-ui-react";

class Region extends Component {
  constructor() {
    super();
    this.state = {
      title: "جدول منطقه ها",
      region: [],
      show: false,
      modalOpen: false
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  componentWillMount() {
    var that = this;
    console.log("component mounted!");
    fetch("http://localhost:3000/api/show-region").then(function(response) {
      response.json().then(function(data) {
        that.setState({ region: data });
        console.log("region", that.state.region);
      });
    });
  }

  addRegion(event) {
    event.preventDefault();
    let data = {
      region_number: this.refs.region_number.value,
      population: this.refs.population.value,
      region_name: this.refs.region_name.value
    };

    var request = new Request("http://localhost:3000/api/new-region", {
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
  removeRegion(id) {
    console.log(id);
    let region = this.state.region;
    region.find(function(reg) {
      return reg.region_number === id;
    });
    var request = new Request("http://localhost:3000/api/remove-region/" + id, {
      method: "DELETE"
    });

    fetch(request).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  }

  showRegion() {
    var that = this;
    fetch("http://localhost:3000/api/show-region").then(function(response) {
      response.json().then(function(data) {
        console.log(that.state.region);
        that.setState({ region: data });
      });
    });
  }

  addRegionDiv() {
    let { show } = this.state;
    if (show) {
      return (
        <Container className={"myfont search"}>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="region_number"
              placeholder="شماره منطقه"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="population"
              placeholder="جمعیت"
            />
          </div>
          <div class="ui input">
            <input
              className={"search"}
              type="text"
              ref="region_name"
              placeholder="نام منطقه"
            />
          </div>
        </Container>
      );
    }
  }

  render() {
    var { title, region } = this.state;
    return (
      <div>
        <h1 className={"myfont text-center"}>{title}</h1>

        <Container>
          <table class="ui celled definition compact table">
            <thead class="">
              <tr class="text-center">
                <th class="myfont"></th>
                <th class="myfont">جمعیت</th>
                <th class="myfont">نام منطقه</th>
                <th class="myfont">حذف منطقه</th>
              </tr>
            </thead>
            <tbody class="text-center">
              {region.map(region => (
                <tr>
                  <td>{region.region_number}</td>
                  <td>{region.population}</td>
                  <td>{region.region_name}</td>
                  <td>
                    <button
                      class="ui small icon red right floated right labeled button myfont item-center"
                      onClick={this.removeRegion.bind(
                        this,
                        region.region_number
                      )}
                    >
                      {console.log(region.region_number)}
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
                <th colspan="4" class="">
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
                          افزودن منطقه
                        </span>
                      </button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon
                    size="small"
                  >
                    <Header icon="browser">
                      <span className={"myfont item-center"}>افزودن منطقه</span>
                    </Header>
                    <Modal.Content>{this.addRegionDiv()}</Modal.Content>
                    <Modal.Actions>
                      <button
                        class="ui  icon secondary  right labeled button item-center"
                        onClick={event => {
                          this.addRegion(event);
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
export default Region;
