import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

export default class CourseCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
      <Card containerStyle={{width:'calc(80% - 50px)' ,margin:'auto' }} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="Disc-Golf-Course"
          subtitle="9 holes"
          avatar="https://www.sandypines.com/wp-content/uploads/disc_golf.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="https://www.outsidepursuits.com/wp-content/uploads/2017/08/Best-Disc-Golf-Disc.jpg" alt="course1 Picture" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onClick={this.handleExpand} />
          <FlatButton label="Reduce" onClick={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}
