import React, { useEffect } from "react";
import styled from "styled-components";
import randomString from "../../utils/randomString";
import { transparentize } from "polished";
import IconLogs from "../icons/IconLogs";
import IconOpen from "../icons/IconOpen";
import IconUpdate from "../icons/IconUpdate";
import InstanceProps from "../../utils/InstanceProps";

const Footer = styled.footer`
  margin-top: auto;
  display: flex;
`;

const Button = styled.a<{ disabled: boolean }>`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props =>
    props.disabled && props.theme.color.darkOne
      ? transparentize(0.8, props.theme.color.lightOne)
      : props.theme.color.lightOne};
  fill: ${props =>
    props.disabled && props.theme.color.darkOne
      ? transparentize(0.8, props.theme.color.lightOne)
      : props.theme.color.lightOne};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  padding: 1rem 0;
  transition: background-color 0.15s ease-out;
  font-size: 1.5em;

  :hover {
    background-color: ${({ theme }) => theme.color.darkTwo};
  }
`;

const Text = styled.div`
  font-size: 0.6em;
  margin-top: 0.2em;
`;

const CardFooter = (props: {
  chosenOne: InstanceProps;
  instancesToUpdate: string[];
}) => {
  const [awsUpdateUrl, setAwsUpdateUrl] = React.useState("");

  const setUrl = () => {
    const urlHost = `https://eu-west-2.console.aws.amazon.com/systems-manager/automation/execute/Update-Curatr-Version`;
    const urlRegion = `?region=${"hererererrerererererererer"}`;
    const urlInstances = `#InstanceId=${props.instancesToUpdate}`;
    const urlRandom = `&randomString=${randomString()}${randomString()}--${
      props.chosenOne.stackName
    }--${randomString()}${randomString()}`;
    const urlVersion = `&releaseBranch=${props.chosenOne.instanceVersion}`;
    const urlOptions = `&runMigrations=true&updateEnv=true&updateConfs=true`;

    const url = `${urlHost}${urlRegion}${urlInstances}${urlRandom}${urlVersion}${urlOptions}`;
    setAwsUpdateUrl(url);
  };

  useEffect(() => {
    setUrl();
  }, [props.chosenOne.stackAppUrl]);

  return (
    <Footer>
      <Button
        title="View Logs"
        target="_blank"
        rel="noreferrer noopener"
        disabled={!props.chosenOne.stackLogsUrl}
        href={props.chosenOne.stackLogsUrl}
      >
        <IconLogs width="40px" />
        <Text>Logs</Text>
      </Button>
      <Button
        title="View Site"
        target="_blank"
        rel="noreferrer noopener"
        disabled={!props.chosenOne.stackAppUrl}
        href={props.chosenOne.stackAppUrl}
      >
        <IconOpen width="40px" />
        <Text>Open</Text>
      </Button>
      <Button
        title="Update Stack"
        target="_blank"
        rel="noreferrer noopener"
        disabled={!props.instancesToUpdate || !props.chosenOne.instanceVersion}
        onClick={setUrl}
        href={awsUpdateUrl}
      >
        <IconUpdate width="40px" />
        <Text>Update</Text>
      </Button>
    </Footer>
  );
};

export default CardFooter;
