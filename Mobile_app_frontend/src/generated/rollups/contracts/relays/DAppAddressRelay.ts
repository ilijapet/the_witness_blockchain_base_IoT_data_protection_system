/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface DAppAddressRelayInterface extends utils.Interface {
  functions: {
    "getInputBox()": FunctionFragment;
    "relayDAppAddress(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getInputBox" | "relayDAppAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getInputBox",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "relayDAppAddress",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getInputBox",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "relayDAppAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export interface DAppAddressRelay extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DAppAddressRelayInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    /**
     * Get the input box used by this relay.
     */
    getInputBox(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Add an input to a DApp's input box with its address.
     * @param _dapp The address of the DApp
     */
    relayDAppAddress(
      _dapp: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  /**
   * Get the input box used by this relay.
   */
  getInputBox(overrides?: CallOverrides): Promise<string>;

  /**
   * Add an input to a DApp's input box with its address.
   * @param _dapp The address of the DApp
   */
  relayDAppAddress(
    _dapp: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    /**
     * Get the input box used by this relay.
     */
    getInputBox(overrides?: CallOverrides): Promise<string>;

    /**
     * Add an input to a DApp's input box with its address.
     * @param _dapp The address of the DApp
     */
    relayDAppAddress(_dapp: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    /**
     * Get the input box used by this relay.
     */
    getInputBox(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Add an input to a DApp's input box with its address.
     * @param _dapp The address of the DApp
     */
    relayDAppAddress(
      _dapp: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Get the input box used by this relay.
     */
    getInputBox(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Add an input to a DApp's input box with its address.
     * @param _dapp The address of the DApp
     */
    relayDAppAddress(
      _dapp: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}