import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './title';
import { axiosInstance } from '../../axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function CarStatistic(props) {
  const rows = Array.isArray(props.data) ? props.data : [];

  return (
    <React.Fragment>
      <Title> Car statistic </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Current kilometers</TableCell>
            <TableCell>Engine status</TableCell>
            <TableCell>Brakes status</TableCell>
            <TableCell>Tires status</TableCell>
            <TableCell align="right">Last update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={props.data.uuid}>
            <TableCell>{props.data.distance}</TableCell>
            <TableCell
              style={{ color: props.data.engine_status ? 'red' : 'inherit' }}
            >
              {props.data.engine_status ? 'Not Operational' : 'Operational'}
            </TableCell>
            <TableCell
              style={{ color: props.data.brake_status ? 'red' : 'inherit' }}
            >
              {props.data.brake_status ? 'Needs Maintenance' : 'Good'}
            </TableCell>
            <TableCell
              style={{ color: props.data.tires_status ? 'red' : 'inherit' }}
            >
              {props.data.tires_status ? 'Needs Replacement' : 'Good'}
            </TableCell>
            <TableCell align="right">{props.data.create_at}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
