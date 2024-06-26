/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20Portal,
  ERC20PortalInterface,
} from "../../../contracts/portals/ERC20Portal";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IInputBox",
        name: "_inputBox",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_dapp",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_execLayerData",
        type: "bytes",
      },
    ],
    name: "depositERC20Tokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getInputBox",
    outputs: [
      {
        internalType: "contract IInputBox",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161045f38038061045f83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516103ce61009160003960008181603c015261013501526103ce6000f3fe608060405234801561001057600080fd5b50600436106100355760003560e01c8062aace9a1461003a57806395854b8114610077575b600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006040516001600160a01b03909116815260200160405180910390f35b61008a610085366004610209565b61008c565b005b6040516323b872dd60e01b81523360048201526001600160a01b03858116602483015260448201859052600091908716906323b872dd906064016020604051808303816000875af11580156100e5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010991906102a8565b9050600061011b8288338888886101b9565b604051631789cd6360e01b81529091506001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631789cd639061016c90899085906004016102d1565b6020604051808303816000875af115801561018b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101af919061032f565b5050505050505050565b60608686868686866040516020016101d696959493929190610348565b60405160208183030381529060405290509695505050505050565b6001600160a01b038116811461020657600080fd5b50565b60008060008060006080868803121561022157600080fd5b853561022c816101f1565b9450602086013561023c816101f1565b935060408601359250606086013567ffffffffffffffff8082111561026057600080fd5b818801915088601f83011261027457600080fd5b81358181111561028357600080fd5b89602082850101111561029557600080fd5b9699959850939650602001949392505050565b6000602082840312156102ba57600080fd5b815180151581146102ca57600080fd5b9392505050565b60018060a01b038316815260006020604081840152835180604085015260005b8181101561030d578581018301518582016060015282016102f1565b506000606082860101526060601f19601f830116850101925050509392505050565b60006020828403121561034157600080fd5b5051919050565b86151560f81b815260006bffffffffffffffffffffffff19808860601b166001840152808760601b166015840152508460298301528284604984013750600091016049019081529594505050505056fea264697066735822122050b5819889408b2d1aed09ead1961cc5188efa933c68ede1ae413d96ed854d1c64736f6c63430008130033";

type ERC20PortalConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20PortalConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Portal__factory extends ContractFactory {
  constructor(...args: ERC20PortalConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _inputBox: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ERC20Portal> {
    return super.deploy(_inputBox, overrides || {}) as Promise<ERC20Portal>;
  }
  override getDeployTransaction(
    _inputBox: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(_inputBox, overrides || {});
  }
  override attach(address: string): ERC20Portal {
    return super.attach(address) as ERC20Portal;
  }
  override connect(signer: Signer): ERC20Portal__factory {
    return super.connect(signer) as ERC20Portal__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20PortalInterface {
    return new utils.Interface(_abi) as ERC20PortalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Portal {
    return new Contract(address, _abi, signerOrProvider) as ERC20Portal;
  }
}
