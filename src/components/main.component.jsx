import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import Candida from "./candida.component";
import { Container, Grid} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    console.log("main",props);
    this.state = {
      Redirect: false
    };
  }
  buttons = () => {
    return (
      <Router>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
                <h1 className={"myfont text-center"}>صفحه اصلی</h1>
              </Grid.Column>
              <Grid.Column width={5} />

              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
            
                  <button 
                  class="ui big icon blue right floated right labeled button myfont item-center"
                   onClick={()=> this.props.history.push('/candida')}>
                    <span className={"myfont"}>ورود به جدول کاندیدا</span>
                  </button>
              </Grid.Column>
              <Grid.Column width={5} />

              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
                <button class="ui big icon red right floated right labeled button myfont item-center"
                onClick={()=> this.props.history.push('/region')}>
                  <span className={"myfont"}>ورود به جدول مناطق</span>
                </button>{" "}
              </Grid.Column>
              <Grid.Column width={5} />

              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
                <button
                  class="ui big icon orange right floated right labeled button myfont item-center"
                  onClick={()=> this.props.history.push('/people')}
                >
                  <span className={"myfont"}>ورود به جدول مردم</span>
                </button>{" "}
              </Grid.Column>
              <Grid.Column width={5} />

              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
                <button class="ui big icon purple right floated right labeled button myfont item-center"
                onClick={()=> this.props.history.push('/gerayesh')}>
                  <span className={"myfont"}>ورود به جدول گرایش حزبی</span>
                </button>{" "}
              </Grid.Column>
              <Grid.Column width={5} />

              <Grid.Column width={5} />
              <Grid.Column width={6} className={"styler item-center"}>
                <button class="ui big icon black right floated right labeled button myfont item-center"
                onClick={()=> this.props.history.push('/madrak')}>
                  <span className={"myfont"}>ورود به جدول مدرک</span>
                </button>{" "}
              </Grid.Column>
              <Grid.Column width={5} />
            </Grid.Row>
          </Grid>
        </Container>
        <Switch>
          <Route exact path="/candida">
            <Candida />
          </Route>
          <Route path="/users">
            <Candida />
          </Route>
          <Route exact path="/" />
        </Switch>
      </Router>
    );
  };
  render() {
      
    return this.buttons()
    ;
  }
}
export default Main;
