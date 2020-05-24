import React, { Component } from 'react';
import cuid from 'cuid'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm.jsx'

const eventsDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisqu magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'assets/people.jpeg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'assets/people.jpeg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'assets/people2.jpeg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'assets/people2.jpeg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'assets/people.jpeg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'assets/people2.jpeg'
      }
    ]
  }
]


class EventDashboard extends Component {

  state = {
    events: eventsDashboard,
    isOpen: false,
    selectedEvent: null,
  }

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }

  handleEditEvent = (eventToUpdat) => () => {
    this.setState({
      selectedEvent: eventToUpdat,
      isOpen: true
    })
  }

  handleUpdateEvent = (updateEvent) => {
    this.setState({
      events : this.state.events.map((event) => {
        if(event.id === updateEvent.id){
          return Object.assign({}, updateEvent)
        }else{
          return event
        }
      }),
      
    })
  }

  hanleDeleteEvent = (eventId) => () => {
    const updateEvents = this.state.events.filter(e => e.id !== eventId)
    this.setState({
      events : updateEvents
    })
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid()
    newEvent.hostPhotoURL = '/assets/user.png'
    const updateEvents = [...this.state.events, newEvent]
    this.setState({
      events: updateEvents,
      isOpen: false,
    })
  }

  render() {
    const { selectedEvent } = this.state
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList 
          deleteEvent={this.hanleDeleteEvent}
          onEventEdit={this.handleEditEvent}
          events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {this.state.isOpen && 
          <EventForm 
          updateEvent={this.handleUpdateEvent} 
          selectedEvent={selectedEvent} 
          createEvent={this.handleCreateEvent} 
          handleCancel={this.handleCancel} />}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;