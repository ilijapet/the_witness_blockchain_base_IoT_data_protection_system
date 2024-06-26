/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export type OutputValidityProofStruct = {
  inputIndex: BigNumberish;
  outputIndex: BigNumberish;
  outputHashesRootHash: BytesLike;
  vouchersEpochRootHash: BytesLike;
  noticesEpochRootHash: BytesLike;
  machineStateHash: BytesLike;
  keccakInHashesSiblings: BytesLike[];
  outputHashesInEpochSiblings: BytesLike[];
};

export type OutputValidityProofStructOutput = [
  BigNumber,
  BigNumber,
  string,
  string,
  string,
  string,
  string[],
  string[]
] & {
  inputIndex: BigNumber;
  outputIndex: BigNumber;
  outputHashesRootHash: string;
  vouchersEpochRootHash: string;
  noticesEpochRootHash: string;
  machineStateHash: string;
  keccakInHashesSiblings: string[];
  outputHashesInEpochSiblings: string[];
};

export type ProofStruct = {
  validity: OutputValidityProofStruct;
  context: BytesLike;
};

export type ProofStructOutput = [OutputValidityProofStructOutput, string] & {
  validity: OutputValidityProofStructOutput;
  context: string;
};

export interface CartesiDAppInterface extends utils.Interface {
  functions: {
    "executeVoucher(address,bytes,((uint64,uint64,bytes32,bytes32,bytes32,bytes32,bytes32[],bytes32[]),bytes))": FunctionFragment;
    "getConsensus()": FunctionFragment;
    "getTemplateHash()": FunctionFragment;
    "migrateToConsensus(address)": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "validateNotice(bytes,((uint64,uint64,bytes32,bytes32,bytes32,bytes32,bytes32[],bytes32[]),bytes))": FunctionFragment;
    "wasVoucherExecuted(uint256,uint256)": FunctionFragment;
    "withdrawEther(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "executeVoucher"
      | "getConsensus"
      | "getTemplateHash"
      | "migrateToConsensus"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "onERC721Received"
      | "owner"
      | "renounceOwnership"
      | "supportsInterface"
      | "transferOwnership"
      | "validateNotice"
      | "wasVoucherExecuted"
      | "withdrawEther"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "executeVoucher",
    values: [string, BytesLike, ProofStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getConsensus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTemplateHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "migrateToConsensus",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "validateNotice",
    values: [BytesLike, ProofStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "wasVoucherExecuted",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawEther",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeVoucher",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConsensus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTemplateHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "migrateToConsensus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateNotice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wasVoucherExecuted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawEther",
    data: BytesLike
  ): Result;

  events: {
    "NewConsensus(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "VoucherExecuted(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewConsensus"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoucherExecuted"): EventFragment;
}

export interface NewConsensusEventObject {
  newConsensus: string;
}
export type NewConsensusEvent = TypedEvent<[string], NewConsensusEventObject>;

export type NewConsensusEventFilter = TypedEventFilter<NewConsensusEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface VoucherExecutedEventObject {
  voucherId: BigNumber;
}
export type VoucherExecutedEvent = TypedEvent<
  [BigNumber],
  VoucherExecutedEventObject
>;

export type VoucherExecutedEventFilter = TypedEventFilter<VoucherExecutedEvent>;

export interface CartesiDApp extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CartesiDAppInterface;

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
    executeVoucher(
      _destination: string,
      _payload: BytesLike,
      _proof: ProofStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Get the current consensus.
     */
    getConsensus(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Get the DApp's template hash.
     */
    getTemplateHash(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Can only be called by the DApp owner.
     * Migrate the DApp to a new consensus.
     * @param _newConsensus The new consensus
     */
    migrateToConsensus(
      _newConsensus: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * See {IERC721Receiver-onERC721Received}. Always returns `IERC721Receiver.onERC721Received.selector`.
     */
    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    validateNotice(
      _notice: BytesLike,
      _proof: ProofStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    /**
     * Check whether a voucher has been executed.
     * @param _inboxInputIndex The index of the input in the input box
     * @param _outputIndex The index of output emitted by the input
     */
    wasVoucherExecuted(
      _inboxInputIndex: BigNumberish,
      _outputIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    /**
     * This function can only be called by the DApp itself through vouchers.
     * Transfer some amount of Ether to some recipient.
     * @param _receiver The address which will receive the amount of Ether
     * @param _value The amount of Ether to be transferred in Wei
     */
    withdrawEther(
      _receiver: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  executeVoucher(
    _destination: string,
    _payload: BytesLike,
    _proof: ProofStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Get the current consensus.
   */
  getConsensus(overrides?: CallOverrides): Promise<string>;

  /**
   * Get the DApp's template hash.
   */
  getTemplateHash(overrides?: CallOverrides): Promise<string>;

  /**
   * Can only be called by the DApp owner.
   * Migrate the DApp to a new consensus.
   * @param _newConsensus The new consensus
   */
  migrateToConsensus(
    _newConsensus: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * See {IERC721Receiver-onERC721Received}. Always returns `IERC721Receiver.onERC721Received.selector`.
   */
  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * See {IERC165-supportsInterface}.
   */
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  validateNotice(
    _notice: BytesLike,
    _proof: ProofStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * Check whether a voucher has been executed.
   * @param _inboxInputIndex The index of the input in the input box
   * @param _outputIndex The index of output emitted by the input
   */
  wasVoucherExecuted(
    _inboxInputIndex: BigNumberish,
    _outputIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * This function can only be called by the DApp itself through vouchers.
   * Transfer some amount of Ether to some recipient.
   * @param _receiver The address which will receive the amount of Ether
   * @param _value The amount of Ether to be transferred in Wei
   */
  withdrawEther(
    _receiver: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    executeVoucher(
      _destination: string,
      _payload: BytesLike,
      _proof: ProofStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Get the current consensus.
     */
    getConsensus(overrides?: CallOverrides): Promise<string>;

    /**
     * Get the DApp's template hash.
     */
    getTemplateHash(overrides?: CallOverrides): Promise<string>;

    /**
     * Can only be called by the DApp owner.
     * Migrate the DApp to a new consensus.
     * @param _newConsensus The new consensus
     */
    migrateToConsensus(
      _newConsensus: string,
      overrides?: CallOverrides
    ): Promise<void>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * See {IERC721Receiver-onERC721Received}. Always returns `IERC721Receiver.onERC721Received.selector`.
     */
    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validateNotice(
      _notice: BytesLike,
      _proof: ProofStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Check whether a voucher has been executed.
     * @param _inboxInputIndex The index of the input in the input box
     * @param _outputIndex The index of output emitted by the input
     */
    wasVoucherExecuted(
      _inboxInputIndex: BigNumberish,
      _outputIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * This function can only be called by the DApp itself through vouchers.
     * Transfer some amount of Ether to some recipient.
     * @param _receiver The address which will receive the amount of Ether
     * @param _value The amount of Ether to be transferred in Wei
     */
    withdrawEther(
      _receiver: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NewConsensus(address)"(newConsensus?: null): NewConsensusEventFilter;
    NewConsensus(newConsensus?: null): NewConsensusEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "VoucherExecuted(uint256)"(voucherId?: null): VoucherExecutedEventFilter;
    VoucherExecuted(voucherId?: null): VoucherExecutedEventFilter;
  };

  estimateGas: {
    executeVoucher(
      _destination: string,
      _payload: BytesLike,
      _proof: ProofStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Get the current consensus.
     */
    getConsensus(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Get the DApp's template hash.
     */
    getTemplateHash(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Can only be called by the DApp owner.
     * Migrate the DApp to a new consensus.
     * @param _newConsensus The new consensus
     */
    migrateToConsensus(
      _newConsensus: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * See {IERC721Receiver-onERC721Received}. Always returns `IERC721Receiver.onERC721Received.selector`.
     */
    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    validateNotice(
      _notice: BytesLike,
      _proof: ProofStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Check whether a voucher has been executed.
     * @param _inboxInputIndex The index of the input in the input box
     * @param _outputIndex The index of output emitted by the input
     */
    wasVoucherExecuted(
      _inboxInputIndex: BigNumberish,
      _outputIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * This function can only be called by the DApp itself through vouchers.
     * Transfer some amount of Ether to some recipient.
     * @param _receiver The address which will receive the amount of Ether
     * @param _value The amount of Ether to be transferred in Wei
     */
    withdrawEther(
      _receiver: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    executeVoucher(
      _destination: string,
      _payload: BytesLike,
      _proof: ProofStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Get the current consensus.
     */
    getConsensus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Get the DApp's template hash.
     */
    getTemplateHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Can only be called by the DApp owner.
     * Migrate the DApp to a new consensus.
     * @param _newConsensus The new consensus
     */
    migrateToConsensus(
      _newConsensus: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC721Receiver-onERC721Received}. Always returns `IERC721Receiver.onERC721Received.selector`.
     */
    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    validateNotice(
      _notice: BytesLike,
      _proof: ProofStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Check whether a voucher has been executed.
     * @param _inboxInputIndex The index of the input in the input box
     * @param _outputIndex The index of output emitted by the input
     */
    wasVoucherExecuted(
      _inboxInputIndex: BigNumberish,
      _outputIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * This function can only be called by the DApp itself through vouchers.
     * Transfer some amount of Ether to some recipient.
     * @param _receiver The address which will receive the amount of Ether
     * @param _value The amount of Ether to be transferred in Wei
     */
    withdrawEther(
      _receiver: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
