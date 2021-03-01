// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract Marketplace {
    struct estate {
        string _name;
        string _postalAddress;
        string[] _images;
        uint _price;
        address payable _ownerEstate;
        bool _selling;
    }

    string[] _sales;
    address payable _owner;
    estate[] _estates;

    mapping(address => uint[]) _ownerEstate;
    mapping(uint => estate) _idEstate;

    constructor() public {
        _owner = msg.sender;
    }


    function createEstate(string memory nom, string memory adres, uint price, string[] memory img) public {
        require(price > 10, "le prix doit etre superieur a 10");
        estate memory create = estate(nom, adres, img, price, msg.sender, false);
        _estates.push(create);
        uint id = _estates.length - 1;
        _idEstate[id] = create;
        _ownerEstate[msg.sender].push(id);
    }

    function setEstateSale(uint id) public {
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        _estates[id]._selling = true;
    }

    function setPrice(uint id, uint newPrice) public {
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        _estates[id]._price = newPrice;
    }

    function setPostalAddress(uint id, string memory newPostalAddress) public {
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        _estates[id]._postalAddress = newPostalAddress;
    }

    function setName(uint id, string memory newName) public {
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        _estates[id]._name = newName;
    }

    function cancelEstateSale(uint id) public {
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        _estates[id]._selling = false;
    }

    function BuyEstate(uint id) public payable {
        require(_estates[id]._selling, "n'est pas en vente");

        address payable seller = _estates[id]._ownerEstate;

        uint price = _estates[id]._price;

        require(msg.value >= price, 'Manque de la thune');

        uint commission = msg.value / 10;
        uint sale = msg.value - commission;

        seller.transfer(sale);
        _owner.transfer(commission);

        _estates[id]._ownerEstate = msg.sender;
        _estates[id]._selling = false;
    }

    function getAllEstates() public view returns (estate[] memory){
        return _estates;
    }

    function getEstateByAddress(address addr) public view returns (estate[] memory){
        estate[] memory estatesList;
        uint[] memory estateIds = _ownerEstate[addr];
        for (uint i = 0; i < estateIds.length; i++) {
            estatesList[i] = _idEstate[estateIds[i]];
        }
        return estatesList;
    }

    function getEstateById(uint id) public view returns (estate memory){
        return _idEstate[id];
    }
}