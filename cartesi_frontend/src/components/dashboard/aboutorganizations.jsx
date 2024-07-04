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

import { ethers } from 'ethers';
import donationAbi from './abi/Donation.json';

function createData(id, name, shipTo, paymentMethod, status) {
  return { id, name, shipTo, paymentMethod, status };
}
function preventDefault(event) {
  event.preventDefault();
}

export default function AboutOrganizations() {
  const [contract, setContract] = useState(null);
  const [donationSuccessUNICEF, setDonationSuccessUNICEF] = useState('Status');
  const [donationSuccessUNDP, setDonationSuccessUNDP] = useState('Status');
  const [donationSuccessTrentino, setDonationSuccessTrentino] =
    useState('Status');
  const [donationSuccessUNESCO, setDonationSuccessUNESCO] = useState('Status');
  const [donationSuccessSOS, setDonationSuccessSOS] = useState('Status');

  const rows = [
    createData(
      0,
      'UNICEF',
      'New York, United States',
      'UNICEF, or the United Nations International Childrens Emergency Fund, is a specialized agency of the United Nations dedicated to promoting the well-being and rights of children globally. It was established in 1946 to provide emergency food and healthcare to children in countries that had been devastated by World War II. UNICEFs mission has since expanded to address a broader range of issues affecting children, including education, clean water, nutrition, and protection from violence and exploitation. The organization works in over 190 countries, relying on partnerships with governments, NGOs, and the private sector to deliver programs and initiatives that benefit children. UNICEF is funded entirely by voluntary contributions and operates based on the principles of the Convention on the Rights of the Child.',
      donationSuccessUNICEF,
    ),
    createData(
      1,
      'UNDP',
      'New York, United States',
      'The United Nations Development Programme (UNDP) is a global organization that works to eradicate poverty, reduce inequalities, and promote sustainable development. Established in 1965, UNDP focuses on providing technical assistance, capacity building, and policy advice to help countries achieve their development goals. The organization operates in over 170 countries and territories, working closely with governments, civil society, and the private sector. UNDPs initiatives cover a wide range of areas, including poverty alleviation, democratic governance, environmental sustainability, and crisis recovery. It plays a crucial role in supporting nations to address complex development challenges and achieve the Sustainable Development Goals (SDGs).',
      donationSuccessUNDP,
    ),
    createData(
      2,
      'Trentino con I Balcani',
      'Trentino, IT',
      'Regional cooperation organizaiton fouces on sustanible devleopment.',
      donationSuccessTrentino,
    ),
    createData(
      3,
      'UNESCO',
      'Paris, France',
      'The United Nations Educational, Scientific and Cultural Organization (UNESCO) is a specialized agency of the United Nations aimed at promoting peace and security through international cooperation in education, the sciences, and culture. Established in 1945, UNESCO is headquartered in Paris, France, and operates in various fields, including education, natural sciences, social/human sciences, culture, communication, and information. The organization is known for its efforts to preserve cultural heritage, promote freedom of expression, and advance universal access to education. UNESCO also designates and protects World Heritage Sites, recognizing and preserving places of outstanding cultural or natural importance. The organization works with member states and partners globally to foster collaboration and mutual understanding for the benefit of humanity.',
      donationSuccessUNESCO,
    ),
    createData(
      4,
      'SOS Children’s Villages',
      'Vienna, Austria',
      'SOS Childrens Villages is an international non-governmental organization that focuses on providing long-term care for orphaned and abandoned children. Founded in 1949, it operates on the principle of creating stable family environments for children who have lost parental care. The organization establishes Childrens Villages, which are supportive communities where children live with an SOS mother and siblings. SOS Childrens Villages also provides education, healthcare, and vocational training to empower children for independent living. With a presence in over 130 countries, the organization works to ensure the well-being and development of children through its family-based approach to care.',
      donationSuccessSOS,
    ),
  ];

  const switcher = (prop, status) => {
    switch (prop) {
      case 0:
        setDonationSuccessUNICEF(status);
        break;
      case 1:
        setDonationSuccessUNDP(status);
        break;
      case 2:
        setDonationSuccessTrentino(status);
        break;
      case 3:
        setDonationSuccessUNESCO(status);
        break;
      case 4:
        setDonationSuccessSOS(status);
        break;
      default:
        break;
    }
  };

  const donate = async (prop) => {
    console.log(prop);
    if (window.ethereum) {
      const result = await window.ethereum.request({ method: 'eth_accounts' });
      if (result.length > 0) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const currentSigner = await ethersProvider.getSigner();
        const contractDonation = new ethers.Contract(
          '0x1fA99bB28cc817aAc2B5D35bE56c0121DAdC8E0F',
          donationAbi['abi'],
          currentSigner,
        );
        setContract(contractDonation);
        console.log(contractDonation);
        try {
          const amount = ethers.parseEther('0.1');
          const tx = await contractDonation.donate({ value: amount });
          switcher(prop, 'Pending');
          const receipt = await ethersProvider.waitForTransaction(tx.hash);
          if (receipt.status === 1) {
            console.log('Transaction was successful');
            switcher(prop, 'Success');
          } else {
            switcher(prop, 'Failed');
            console.log('Transaction failed');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Please connect your wallet');
      }
    }
  };

  return (
    <React.Fragment>
      <Title> About organizations </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Organization name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            {/* <TableCell align="right">Donate 0.1 ETH to organziation</TableCell>
            <TableCell align="right">Payment status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              {/* <TableCell align="right"><Button color="inherit" onClick={ () => donate(row.id) }>Donate </Button></TableCell>
              <TableCell align="right"> {row.status}</TableCell>               */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
