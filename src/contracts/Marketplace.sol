// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract Marketplace {
    struct estate {
        uint _id;
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
        uint id = _estates.length - 1;
        estate memory create = estate(id, nom, adres, img, price, msg.sender, false);
        _estates.push(create);
        _idEstate[id] = create;
        _ownerEstate[msg.sender].push(id);
    }


    function updateEstate(uint id, string memory newName, string memory newPostalAddress, uint newPrice, bool newSelling, string[] memory newImages) public{
        require(_estates[id]._ownerEstate == msg.sender, "tu n'est pas proprietaire du bien");
        require( newPrice > 10, "le prix doit etre superieur a 10" );
        _estates[id]._selling = true;
        _estates[id]._price = newPrice;
        _estates[id]._postalAddress = newPostalAddress;
        _estates[id]._name = newName;
        _estates[id]._selling = newSelling;
        _estates[id]._images = newImages;
    }


    function buyEstate(uint id) public payable {
        require(_estates[id]._selling, "n'est pas en vente");

        address payable seller = _estates[id]._ownerEstate;

        uint price = _estates[id]._price;


        require(msg.value >= price, 'Manque de l\'argent');

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