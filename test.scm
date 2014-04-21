(define fact (lambda (x)
               (if (= x 0)
                   1
                   (* (fact (- x 1))
                      x))))

(fact 6)
