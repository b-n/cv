import React from 'react'
import styled from 'styled-components'
import { format, differenceInMonths } from 'date-fns'

const Container = styled.div`
  position: relative;
  padding-left: 0.5em;
`

const Bar = styled.div`
  position: absolute;
  left: -48px;
  top: 0;
  width: 12px;
  height: 100%;
  background-color: #9eb5ff;
  border-radius: 0px 12px 12px 0px;

  @media (max-width: 768px) {
    width: 8px;
    left: -16px;
    border-radius: 0px 8px 8px 0px;
  }
`

const Separator = styled.span`
  padding: 0px 5px;
  &:before {
    content: '//';
    font-size: 1.3em;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const Heading = styled.h3``

const JobTitle = styled.h3`
  display: inline-block;
  margin-top: 0.8em;
  margin-bottom: 0;
`

const Company = styled.span`
  display: inline-block;
  font-style: italic;
  margin-top: 0.8em;
  margin-bottom: 0;

  @media (max-width: 768px) {
    display: block;
    margin-top: 0;
    font-size: 1.2rem;
    font-weight: normal;
  }
`

const SubHeading = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.8em;
`

const plural = (value, text) => {
  return `${value} ${text}${value == 0 || value > 1 ? 's' : ''}`
}

const formattedDate = (date) => {
  return `${format(date, "MMM")} '${format(date, "yy")}`
}

const timeLength = (from, to) => {
  const end = to == null ? new Date() : to

  const totalMonths = differenceInMonths(end, from)
  const years = Math.floor(totalMonths / 12)
  const months = Math.floor(totalMonths % 12)
  return `${plural(years, 'year')} ${plural(months, 'month')} ${to == null ? 'and counting' : ''}`
}

const timeRange = (from, to) => {
  return `${formattedDate(from)} → ${to == null ? 'Present' : formattedDate(to)}`
}

const WorkHistory = ({html, company, location, title, timeFrom, timeTo}) => {
  const from = new Date(timeFrom)
  const to = timeTo == null ? null : new Date(timeTo)
  console.log(title, from, to)
  return (
    <>
      <Container>
        <Bar />
        <Heading>
          <JobTitle>{title}</JobTitle>
          <Separator />
          <Company>{company}</Company>
        </Heading>
        <SubHeading>
          {location} — {timeRange(from, to)} — {timeLength(from, to)}
        </SubHeading>
        <div dangerouslySetInnerHTML={{ __html: html}} />
      </Container>
    </>
  )
}

export default WorkHistory
