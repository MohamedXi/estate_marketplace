/*
async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
}

async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

constructor(props) {
    super(props)
    this.state = {
        account: '',
        productCount: 0,
        estates: [],
        loading: true
    }

    // j'ai commenter ceci car cela bloquai le code

    //this.createEstate = this.createProduct.bind(this)
    //this.setEstateSale = this.purchaseProduct.bind(this)
}

async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
        const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
        this.setState({marketplace})
        this.setState({loading: false})
    } else {
        window.alert('Marketplace contract not deployed to detected network.')
    }
}

// creation d'un bien ( estate )
// string , int , list string[ ], string
createEstate(name, price, image, address) {
    this.setState({loading: true})
    this.state.marketplace.methods.createEstate(name, address, price, image).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("le prix doit etre superieur a 10")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// mettre en vente un bien
// int
setEstateSale(id) {
    this.setState({loading: true})
    this.state.marketplace.methods.setEstateSale(id).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Tu n'est pas propriétaire du bien")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// changer le prix a un bien ( estate )
// int , int
setPrice(id, newPrice) {
    this.setState({loading: true})
    this.state.marketplace.methods.setPrice(id, newPrice).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Tu n'est pas propriétaire du bien ou le pix doit etre superieur a 10")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// changer l'adresse postal d'un bien
// int , string
setPostalAddress(id, newPostalAddress) {
    this.setState({loading: true})
    this.state.marketplace.methods.setPostalAddress(id, newPostalAddress).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Tu n'est pas propriétaire du bien")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// changer le nom d'un bien
// int , string
setName(id, newName) {
    this.setState({loading: true})
    this.state.marketplace.methods.setName(id, newName).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Tu n'est pas propriétaire du bien")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// annuler la vente d'un bien ( estate )
// int
cancelEstateSale(id) {
    this.setState({loading: true})
    this.state.marketplace.methods.cancelEstateSale(id).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Tu n'est pas propriétaire du bien")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// acheter un bien
// int , int
BuyEstate(id, price) {
    this.setState({loading: true})
    this.state.marketplace.methods.BuyEstate(id).send({from: this.state.account, value: price})
        .on('error', function (error) {
            window.alert("n'est pas en vente ou Manque de l'argent")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// rechercher les biens d'une adresse (utilisateur)
// string
getEstateByAddress(address) {
    this.setState({loading: true})
    this.state.marketplace.methods.getEstateByAddress(address).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Propriétaire inconu")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}

// rechercher un bien selon son id
// int
getEstateById(id) {
    this.setState({loading: true})
    this.state.marketplace.methods.getEstateById(id).send({from: this.state.account})
        .on('error', function (error) {
            window.alert("Estate inconnu")
        })
        .on('receipt', function (receipt) {
            console.log(receipt)
            this.setState({loading: false})
        })
}
 */