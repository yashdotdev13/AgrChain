// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title AgriChain - Farm to Consumer Supply Chain Tracker
/// @notice Tracks agricultural produce from Farmer -> Distributor -> Retailer -> Sold
/// @dev Includes structs, mappings, events, batch operations, and role-based access
contract AgriChain {

    /// STRUCTS
    struct Farmer {
        string name;
        address wallet;
        bool exists;
    }

    struct Distributor {
        string name;
        address wallet;
        bool exists;
    }

    struct Retailer {
        string name;
        address wallet;
        bool exists;
    }

    struct Produce {
        uint id;
        string name;
        string description;
        uint quantity;      // in kg
        uint timestamp;     // production timestamp
        address currentOwner;
        ProduceStatus status;
    }

    /// ENUMS
    enum ProduceStatus { FARMER, DISTRIBUTOR, RETAILER, SOLD }

    /// STATE VARIABLES
    uint public produceCounter;

    mapping(address => Farmer) public farmers;
    mapping(address => Distributor) public distributors;
    mapping(address => Retailer) public retailers;
    mapping(uint => Produce) public produces;

    // Produce IDs per owner
    mapping(address => uint[]) private ownerProduceIds;

    /// EVENTS
    event FarmerAdded(address indexed farmer, string name);
    event DistributorAdded(address indexed distributor, string name);
    event RetailerAdded(address indexed retailer, string name);
    event ProduceAdded(uint indexed produceId, string name, address indexed farmer);
    event ProduceTransferred(uint indexed produceId, address indexed from, address indexed to, ProduceStatus status);

    /// MODIFIERS
    modifier onlyFarmer() {
        require(farmers[msg.sender].exists, "Not a registered farmer");
        _;
    }

    modifier onlyDistributor() {
        require(distributors[msg.sender].exists, "Not a registered distributor");
        _;
    }

    modifier onlyRetailer() {
        require(retailers[msg.sender].exists, "Not a registered retailer");
        _;
    }

    /// REGISTRATION FUNCTIONS
    function addFarmer(string memory _name) external {
        require(!farmers[msg.sender].exists, "Farmer already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        farmers[msg.sender] = Farmer(_name, msg.sender, true);
        emit FarmerAdded(msg.sender, _name);
    }

    function addDistributor(string memory _name) external {
        require(!distributors[msg.sender].exists, "Distributor already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        distributors[msg.sender] = Distributor(_name, msg.sender, true);
        emit DistributorAdded(msg.sender, _name);
    }

    function addRetailer(string memory _name) external {
        require(!retailers[msg.sender].exists, "Retailer already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        retailers[msg.sender] = Retailer(_name, msg.sender, true);
        emit RetailerAdded(msg.sender, _name);
    }

    /// PRODUCE MANAGEMENT

    // Internal function to avoid repetition
    function _addProduce(
        string memory _name,
        string memory _description,
        uint _quantity
    ) internal {
        require(bytes(_name).length > 0, "Produce name required");
        require(bytes(_description).length > 0, "Description required");
        require(_quantity > 0, "Quantity must be > 0");

        produceCounter++;
        produces[produceCounter] = Produce(
            produceCounter,
            _name,
            _description,
            _quantity,
            block.timestamp,
            msg.sender,
            ProduceStatus.FARMER
        );
        ownerProduceIds[msg.sender].push(produceCounter);
        emit ProduceAdded(produceCounter, _name, msg.sender);
    }

    // External single produce creation
    function addProduce(
        string memory _name,
        string memory _description,
        uint _quantity
    ) external onlyFarmer {
        _addProduce(_name, _description, _quantity);
    }

    // External batch produce creation
    function addMultipleProduces(
        string[] memory _names,
        string[] memory _descriptions,
        uint[] memory _quantities
    ) external onlyFarmer {
        require(
            _names.length == _descriptions.length && _names.length == _quantities.length,
            "Array length mismatch"
        );
        for (uint i = 0; i < _names.length; i++) {
            _addProduce(_names[i], _descriptions[i], _quantities[i]);
        }
    }

    // Transfer functions
    function transferToDistributor(uint _produceId, address _distributor) external onlyFarmer {
        Produce storage p = produces[_produceId];
        require(p.currentOwner == msg.sender, "Not owner");
        require(distributors[_distributor].exists, "Distributor not registered");
        _updateOwnership(_produceId, _distributor, ProduceStatus.DISTRIBUTOR);
    }

    function transferToRetailer(uint _produceId, address _retailer) external onlyDistributor {
        Produce storage p = produces[_produceId];
        require(p.currentOwner == msg.sender, "Not owner");
        require(retailers[_retailer].exists, "Retailer not registered");
        _updateOwnership(_produceId, _retailer, ProduceStatus.RETAILER);
    }

    function markAsSold(uint _produceId) external onlyRetailer {
        Produce storage p = produces[_produceId];
        require(p.currentOwner == msg.sender, "Not owner");
        _updateOwnership(_produceId, address(0), ProduceStatus.SOLD);
    }

    /// INTERNAL FUNCTION TO UPDATE OWNERSHIP
    function _updateOwnership(uint _produceId, address _newOwner, ProduceStatus _status) internal {
        Produce storage p = produces[_produceId];
        uint[] storage ownerList = ownerProduceIds[p.currentOwner];

        // Remove produce from previous owner
        for (uint i = 0; i < ownerList.length; i++) {
            if (ownerList[i] == _produceId) {
                ownerList[i] = ownerList[ownerList.length - 1];
                ownerList.pop();
                break;
            }
        }

        address previousOwner = p.currentOwner;
        p.currentOwner = _newOwner;
        p.status = _status;

        if (_newOwner != address(0)) {
            ownerProduceIds[_newOwner].push(_produceId);
        }

        emit ProduceTransferred(_produceId, previousOwner, _newOwner, _status);
    }

    /// GETTER FUNCTIONS
    function getProduce(uint _produceId) external view returns (Produce memory) {
        return produces[_produceId];
    }

    function getProduceStatus(uint _produceId) external view returns (ProduceStatus) {
        return produces[_produceId].status;
    }

    function getProducesByOwner(address _owner) external view returns (uint[] memory) {
        return ownerProduceIds[_owner];
    }
}
