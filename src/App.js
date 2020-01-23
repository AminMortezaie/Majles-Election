import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Candida from "./components/candida.component";
import { Container, Grid, Image } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
  }

  fetchQuery1 = () => {
    let data = {
      region_number: this.refs.region_number.value
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
  };

  render() {
    return (
      <Container>
        <h1 className={"myfont text-center"}>صفحه اصلی</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}/><Grid.Column width={6}/>
            
            <Grid.Column width={4} className={"styler item-center"}>
              <button class="ui big icon blue right floated right labeled button myfont item-center">
                <span className={"myfont"}>ورود به جدول کاندیدا</span>
              </button>{" "}
            </Grid.Column>
            
              
            <Grid.Column width={5}/> <Grid.Column width={5}/>
            <Grid.Column width={6} className={"styler item-center"}>
              <div class="ui input">
                
                <button class="ui big icon white right floated right labeled button myfont item-center">
                  <span className={"myfont"}>ورود به جدول مناطق</span>
                </button>
                <input
                  className={"search"}
                  type="text"
                  ref="region_number"
                  placeholder="شماره منطقه"
                />
              </div>
            </Grid.Column>
          
            
            <Grid.Column width={6}/><Grid.Column width={5}/>
            <Grid.Column width={5} className={"styler"}>
              <button class="ui big icon red right floated right labeled button myfont item-center">
                <span className={"myfont"}>ورود به جدول رای دهندگان</span>
              </button>
            </Grid.Column>
            
            
            

            <Grid.Column width={4}/><Grid.Column width={4}/>
            <Grid.Column width={8} className={"styler"}>
              <div class="ui input">
              <input
                  className={"search"}
                  type="text"
                  ref="region_number"
                  placeholder="شماره منطقه"
                />  
                <button class="ui huge icon orange right floated right labeled button myfont">
                  <span className={"myfont"}>
                    مدرک تحصیلی کاندیدا های منطقه ای خاص
                  </span>
                </button>
                
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
export default App;
