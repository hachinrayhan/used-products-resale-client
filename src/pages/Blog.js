import React from 'react';
import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export default function Blog() {
    const [open, setOpen] = useState(1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className='w-full max-w-screen-md mx-auto bg-gray-100 p-6 border rounded-lg text-start'>
            <Fragment>
                <Accordion open={open === 5}>
                    <AccordionHeader onClick={() => handleOpen(5)}>
                        1. What are the different ways to manage a state in a React application?
                    </AccordionHeader>
                    <AccordionBody>
                        There are the different ways to manage a state in a React application. Such as <br />
                        # Reacting to input with state <br />
                        # Choosing the state structure <br />
                        # Sharing state between components <br />
                        # Preserving and resetting state <br />
                        # Extracting state logic into a reducer
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        2. How does prototypical inheritance work?
                    </AccordionHeader>
                    <AccordionBody>
                        Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        3. What is a unit test? Why should we write unit tests?
                    </AccordionHeader>
                    <AccordionBody>
                        Unit testing is a type of software testing where individual units or software components are tested. Its purpose is to validate that each unit of code performs as expected. A unit can be anything you want it to be — a line of code, a method, or a class.  <br /> <br />
                        Here are a few benefits to writing unit tests: <br />
                        * Unit tests save time and money. <br />
                        * Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions. <br />
                        * It simplifies the debugging process. <br />
                        * Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy. <br />
                        * Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        4. React vs. Angular vs. Vue?
                    </AccordionHeader>
                    <AccordionBody>
                        React: <br />
                        React offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. <br />
                        Angular: <br />
                        Angular has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works. <br />
                        Vue: <br />
                        Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                    </AccordionBody>
                </Accordion>
            </Fragment>
        </div>
    );
}