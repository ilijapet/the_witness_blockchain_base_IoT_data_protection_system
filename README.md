Name: Device data integrity system

Project overview

Main goal of this project is to bring power of blockchain and cryptography to the world of IoT devices and on this way secure on-device data integrity.
Problem statement: The current state of affairs reveals that data on IoT devices is primarily safeguarded by promises made by device producers and, at best, by policy documents, rather than by robust data protection technologies. The frequency of these promises being broken has led us to recognize the necessity for a novel approach to addressing the issue of device data integrity. Here we are proposing new solution that places greater emphasis on cryptographic and blockchain guarantees to establish and ensure user trust in data, as opposed to relying on the weak assurances provided by entities whose interests often diverge from those of the users. Even with the best intentions from a company's perspective, the potential for malicious actors to exploit vulnerabilities remains a significant concern.
Here is an example: consider a modern car as an IoT device. Users often face uncertainty regarding the reliability of the mileage displayed on the dashboard. How can they be certain that the odometer reading has not been tampered with? If tampering has occurred, the user may unknowingly overpay for a car, effectively purchasing an older vehicle under the guise of a new one. Moreover, how can users trust that any statistics displayed about the car's performance (average gas spend etc.) are accurate and reflect genuine usage rather than manipulation? Presently, there exists no foolproof method to guarantee data integrity in such scenarios. Users must rely on trust in the seller or manufacturer leaving them vulnerable to potential deceit. As devices around us proliferate and become increasingly integrated in our everyday life ensuring the reliability of the data they contain becomes paramount. This project intend to experiment and demonstrate how blockchain and cryptography can address this challenge.

\*We understand IoT like everything from smart houses, smart phones, wearables, infrastructure components, industrial machinery to car and almost anything in between plugged on internet.
\*\* on car privacy by Mozilla foundation: https://foundation.mozilla.org/en/privacynotincluded/articles/its-official-cars-are-the-worst-product-category-we-have-ever-reviewed-for-privacy/

Scope & Methodology

This project will develop proof of concept with 4 basic interconnected elements. First element will be many mock IoT device working in parallel. This piece of code will play the role of device which generator data during the usage and submitting them to server we called collector. Collector (Djanot REST) will be used to create transaction and in the name of device to submit to blockchain interface contracts. Then Cartesi backend will listen for events and process different device inputs and assign to specific company, device ID and value. And basically in certain intervals IoT devices will submit data to collector, from there to blockchain and then to Cartesi Dapp backend. And this is flow for writing. Now was second flow we have confirm data integrity flow. In this flow user will have ability to interact with his IoT device from frontend dashboard. He can request reading from IoT device about certain data for certain month. IoT device will submit to frontend actual data from machine. Then in second step frontend will query Cartsi Dapp backend for that vehicle id and encrypted value and compare with values he got from IoT device. If they are the same then data integrity is preserved. And in case they are different we can confirm that someobody tapered with data.

Expected Deliverables

Milestones & Timeline

One validator can be run by car company. Another can be run by organization of BWN owner association and then third by tech savvy independent users. Where actually community of producers and owners can together ensure data integrity of all vehicles of that brand.

Privacy: how date never to go from device?
