import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CardList from './gameCard/cardList'
import CurrentChoice from './currentchoice/CurrentChoice'

export default function gameDisplayContainer({alert, hasMenuChanged, matches, league, fixture, isPrams}) {
  //console.log('hasMenuChanged', {hasMenuChanged})
    if (hasMenuChanged == true) {
      return (    
      <Container
      fluid
      style={{
        width: '100%', 
        marginTop: '2%',
        marginBottom: '2%' 
       }}>
        <CssBaseline />
        <CurrentChoice 
        league={league}
        fixture={fixture}/>
        <CardList matches={matches} />    
      </Container>
      )
    } 
    else {
      return (
        <div>
        </div>
        )
      }
    }
