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
  2. `sys-allocation` / `sys-rejection` / `sys-waitlist` (by system)
  3. `pre-allocation` / `pre-rejection` / `pre-waitlist` (by admin)
  4. `withdrawn` (by student)
  5. (`waitlist`) / `rejected` / `offered` (by housing)
  6. `accepted` / `declined` (by student)
  7. `confirmed`

## Complete Application Workflow

| SN  | Who     | When                           | Action                    |                 AF Status Change                  |
| :-: | :------ | :----------------------------- | :------------------------ | :-----------------------------------------------: |
|  1  | Admin   |                                | create ApplicationPeriod  |                                                   |
|  2  | Student | during application window open | submit ApplicationForm    |                    `submitted`                    |
|  3  | system  | reach application window close | close application window  |                   `processing`                    |
|  4  | system  | after application window close | auto-allocate rooms       | `sys-allocation`/ `sys-rejection`/ `sys-waitlist` |
|  5  | Admin   | after system auto-allocation   | review/adjust allocations | `pre-allocation`/ `pre-rejection`/ `pre-waitlist` |
|  6  | Admin   | after review                   | release result            |         `offered`/ `rejected`/ `waitlist`         |
|  7  | Student | before result release          | withdraw application      |                    `withdrawn`                    |
|  8  | Student | after result release           | accept/decline offer      |              `accepted`/ `declined`               |
|  9  | Student | after accept offer             | make payment              |                    `confirmed`                    |
