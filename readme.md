# Monolithic Clean Architecture & DDD TypeScript Project

This is a TypeScript project that follows the principles of Clean Architecture and Domain-Driven Design (DDD) within a monolithic structure.

## Description

This project is a monolith, meaning all its components are interconnected and interdependent, organized into a single codebase. It's structured around the Clean Architecture and DDD methodologies, focusing on separation of concerns, encapsulation, and core domain logic. It uses a rich, expressive, and evolving model to tackle complexity in the heart of the software.

The project is organized into different layers, each with its own responsibility. For example, the InvoiceRepository is responsible for data access, the FindInvoiceUseCase and GenerateInvoiceUseCase are responsible for business logic, and the InvoiceFacade coordinates these use cases. These components are created and wired together in the InvoiceFacadeFactory.

Despite being a monolith, the project maintains a high degree of modularity and testability, thanks to the principles of Clean Architecture and DDD. This makes it easier to manage, test, and evolve over time.

## Getting Started

* Clone the repository: `git clone https://github.com/RaphaelMarquesMartorella/typescript-monolith`
* Follow the right path: `cd typescript-ddd-store` 
* Install dependencies: `npm install`

### Dependencies

* Node.js
* TypeScript
* Jest
* Sequelize
* SWC


### Compile program

* Compile TypeScript to JavaScript: `tsc`

## Running Tests

Run tests using the command: `npm test`

## Help

If you encounter any problems, please open an issue in the GitHub repository.

## Authors

Raphael Martorella 
raphael.martorella@homail.com

This project was initially created as part of a class from Plataforma Full Cycle. I have since expanded on the original work by adding several features of my own.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the LICENSE.md file for details.

## Acknowledgments

This project was initially created as part of a class from [Plataforma Full Cycle](https://github.com/devfullcycle/fc-monolito.git). I have since expanded on the original work by adding several features of my own.

Other inspirations and code snippets:
* [FullCycle-BaseCode](https://github.com/devfullcycle/fc-monolito.git)
* [Awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
