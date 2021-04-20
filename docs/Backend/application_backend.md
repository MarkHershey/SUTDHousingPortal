# Application backend logic

## status

- Visible status: Submitted -> Processing -> (Rejected, Approved)

  1. `submitted` (by student)
  2. `processing` (by system)
  3. (`withdrawn`) (by student)
  4. (`waitlist`) / `rejected` / `offered` (by housing)
  5. `accepted` / `declined` (by student)
  6. `confirmed`

- Internal status:

  1. `submitted` (by student)
  2. `sys-allocated` / `sys-rejection` / `sys-waitlist` (by system)
  3. `pending-allocation` / `pending-rejection` / `pending-waitlist` (by admin)
  4. `withdrawn` (by student)
  5. (`waitlist`) / `rejected` / `offered` (by housing)
  6. `accepted` / `declined` (by student)
  7. `confirmed`

## Complete Application Workflow

| SN  |   Who   |              When              |          Action           |                       AF Status Change                        |
| :-: | :-----: | :----------------------------: | :-----------------------: | :-----------------------------------------------------------: |
|  1  |  Admin  |                                | create ApplicationPeriod  |                                                               |
|  2  | Student | during application window open |  submit ApplicationForm   |                          `submitted`                          |
|  3  | System  | reach application window close | close application window  |                         `processing`                          |
|  4  | System  | after application window close |    auto-allocate rooms    |       `sys-allocated`/ `sys-rejection`/ `sys-waitlist`        |
|  5  |  Admin  |  after system auto-allocation  | review/adjust allocations | `pending-allocation`/ `pending-rejection`/ `pending-waitlist` |
|  6  |  Admin  |          after review          |      release result       |               `offered`/ `rejected`/ `waitlist`               |
|  7  | Student |     before result release      |   withdraw application    |                          withdrawn`                           |
|  8  | Student |      after result release      |   accept/decline offer    |                    `accepted`/ `declined`                     |
|  9  | Student |       after accept offer       |       make payment        |                          `confirmed`                          |
