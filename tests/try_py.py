def test():
    a = []
    b = [1]
    return a or b  # this returns [1]


def test1():
    a = []
    b = 0
    return a or b  # this returns 0


def test2():
    a = True
    b = False
    return a and b  # this returns False


def test3():
    a = 0
    b = True
    return a and b  # this returns 0


if __name__ == "__main__":
    print(test())
    print(test1())
    print(test2())
    print(test3())
