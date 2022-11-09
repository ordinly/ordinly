## Overview

The RESTful API for Ordinly.

### Project Structure

- contexts
  > The majority of the application containing all accessible routes
- db
  > All things related to the DB (schemas, seeding)
- middleware
  > Cross-context middleware (authentication)
- services
  > Code related to communicating with other internal and external services (email, sockets)
- util
  > Cross-context utility and helper functions (formatters, validators)
