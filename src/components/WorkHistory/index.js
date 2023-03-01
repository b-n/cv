import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

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

const HeadingWrapper = styled.div``

const Company = styled.h3`
  display: inline-block;
  font-style: italic;
  margin-top: 0.8em;

  @media (max-width: 768px) {
    display: block;
    margin-top: 0;
    font-size: 1.2rem;
    font-weight: normal;
  }
`

const Separator = styled.div`
  display: inline-block;
  padding: 0px 5px;
  &:before {
    font-size: 1.3em;
    content: '//';
  }
  @media (max-width: 768px) {
    display: none;
  }
`

const JobTitle = styled.h3`
  display: inline-block;
  margin-top: 0.8em;
`

const Duration = styled.div`
  margin-bottom: 0.8em;
`

const formattedDate = (date) => {
  const value = new Date(date);
  return `${format(value, "MMM")} '${format(value, "yy")}`
}

const WorkHistory = ({html, company, title, timeFrom, timeTo}) => (
  <>
    <Container>
      <Bar />
      <HeadingWrapper>
        <JobTitle>{title}</JobTitle>
        <Separator />
        <Company>{company}</Company>
      </HeadingWrapper>
      <Duration>{formattedDate(timeFrom)} - {timeTo == null ? 'Present' : formattedDate(timeTo)}</Duration>
      <div dangerouslySetInnerHTML={{ __html: html}} />
    </Container>
  </>
)

export default WorkHistory
