# estate_marketplace

## Comment faire fonctionner le projet ?

###### Prerequis 

- NodeJS/NPM
- Truffle
- Ganache
- Terminal
- IDE

##### 1.	Installer les dépendances

###### a.	Ganache
Ici, il est recommandé d'utiliser Ganache comme blockchain personnelle pour le développement d'Ethereum. Elle nous permettra de déployer des contrats intelligents, de développer des applications et d'effectuer des tests. Il est disponible sur Windows, Mac et Linux sous forme d'application de bureau et d'outil en ligne de commande ! Vous pouvez le [télécharger ici](https://www.trufflesuite.com/ganache "télécharger ici")

###### b.	NodeJS/NPM
Maintenant que nous disposons d’une blockchain, nous devons configurer notre environnement pour élaborer des contrats intelligents. La première dépendance dont nous aurons besoin est le [Node Package Manager](https://nodejs.org/en/ "Node Package Manager"), ou NPM, qui est fourni avec Node.js. On pout voir si NodeJS est déjà installé en allant sur un terminal et en tapant :

`$ node -v`

###### c.	Truffle
Installons maintenant le Truffle Framework, qui fournit une suite d'outils pour développer des contacts intelligents Ethereum avec le langage de programmation Solidity.

On pout installer Truffle avec NPM en ligne de commande comme ceci : 
Remarque : Il important d’utiliser cette version précise.

`$ sudo npm install -g truffle@5.0.5`

###### d.	Metamask Ethereum Wallet
Il existe plusieurs Ethereum Wallet. Cela-dait, Nous utiliserons l'extension Metamask pour Google Chrome. Pour installer Metamask, il faut le [télécharger dans Chrome Web Store](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr "télécharger dans Chrome Web Store").

Une fois installer (avec un compte), importer les comptes dont vous allez avoir besoin depuis Ganache.

Metamask nous permettra également de gérer notre compte personnel lorsque nous nous connecterons à la blockchain, ainsi que de gérer nos fonds Ether dont nous aurons besoin pour payer les transactions.

###### 2.	Démarrer le projet

Il faut à présent faire tourner le projet sur votre machine.
Pour cela, il va falloir lancer des commandes NPM et Truffle.

Tous d’abord, installez les dépendances NodeJS :

`$ npm install`

Maintenant, il faut compiler le contrat intelligent pour nous assurer que celui-ci fonctionne correctement :

`$ truffle compile`

Maintenant, exécutons les migrations comme ceci :

`$ truffle migrate`

Remarque : Après des modifications des variables vous devez reset les migrations pour que vos modifications soit prise en compte : `$ truffle migrate –reset`

Maintenant, il faut démarre l’application ReactJS pour pouvoir interagir via un interface web avec nos contrats. Dans cette interface, nous pouvons ajouter ou acheter des biens.

Pour lancer ReactJS lancez la commande suivante : 

`$ npm run start`

Vous pouvez trouver plus d’information sur React sur le site officiel
