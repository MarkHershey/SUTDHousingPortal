class AFStatus:
    # by student action
    SUBMIT = "submitted"
    WITHDRAW = "withdrawn"
    ACCEPT = "accepted"  # after offer acceptance
    DECLINE = "declined"
    CONFIRM = "confirmed"  # after payment made
    # by admin/system action
    PROCESS = "processing"
    WAITLIST = "waitlist"
    REJECT = "rejected"
    OFFER = "offered"
    # by system automation
    SYS_ALLOCATE = "sys-allocation"
    SYS_REJECT = "sys-rejection"
    SYS_WAITLIST = "sys-waitlist"
    # by admin manual action
    PRE_ALLOCATE = "pre-allocation"
    PRE_REJECT = "pre-rejection"
    PRE_WAITLIST = "pre-waitlist"

    ALL = [
        SUBMIT,
        WITHDRAW,
        ACCEPT,
        DECLINE,
        CONFIRM,
        PROCESS,
        WAITLIST,
        REJECT,
        OFFER,
        SYS_ALLOCATE,
        SYS_REJECT,
        SYS_WAITLIST,
        PRE_ALLOCATE,
        PRE_REJECT,
        PRE_WAITLIST,
    ]

    PRE_WITHDRAW = [
        SUBMIT,
        PROCESS,
        WAITLIST,
        SYS_ALLOCATE,
        SYS_REJECT,
        SYS_WAITLIST,
        PRE_ALLOCATE,
        PRE_REJECT,
        PRE_WAITLIST,
    ]
