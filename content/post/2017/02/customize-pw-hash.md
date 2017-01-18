+++
author = "Christopher Zell"
categories = ["Integration"]
date = "2017-02-24T10:00:00+02:00"
tags = ["argon2"]
title = "Argon2 as password-hashing function in Camunda"
+++

# Introduction

On the new version of the Camunda Engine Platform (7.7) the User passwords, which are stored in the database, are by default hashed with a SHA-2 familiy algorithm.
Before the passwords are hashed, they are concated with an individual random generated salt for each user, to prevent dictionary and rainbow table attacks.

For someone who needs a more secure hashing algorithm Camunda introduce a new API, which allows to customize and exchange the default hashing algorithm.
In this blog post I will present this customization and will use argon2 as hashing algorithm. Argon2 is a password-hashing function [1], which is considered as state of the art and also wins the Password Hashing Competition in the end of 2015 [2].

# Customization

To use a different password hashing function you have to implement the `PasswordEncryptor` interface.
This interface offers the methods to hash and verify the password. In the following example the
`argon2` implementation [3] is used to hash and verify the password.

```java
package org.camunda.bpm.unittest;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.camunda.bpm.engine.impl.digest.Base64EncodedHashDigest;
import org.camunda.bpm.engine.impl.digest.PasswordEncryptor;
import org.camunda.bpm.engine.impl.digest._apacheCommonsCodec.Base64;

/**
 * @author Christopher Zell <christopher.zell@camunda.com>
 */
public class Argon2HashAlgorithm extends Base64EncodedHashDigest implements PasswordEncryptor {
  public String hashAlgorithmName() {
    return "argon2";
  }

  @Override
  public boolean check(String password, String encrypted) {

    // Create instance
    Argon2 argon2 = Argon2Factory.create();

    // Verify password
    return argon2.verify(new String(Base64.decodeBase64(encrypted)), password);
  }

  @Override
  protected byte[] createByteHash(String password) {

    // Create instance
    Argon2 argon2 = Argon2Factory.create();

    // Hash password
    // 2 iterations, 65536 Memory, 1 parallelism
    String hash = argon2.hash(2, 65536, 1, password);
    return hash.getBytes();
  }
}
```

In order to use the created `PasswordEncryptor` implementation, which uses `argon2`, you have to
set the `passwordEncryptor` property of the ProcessEngineConfiguration. This can be done in the `camunda.cfg.xml`
and could look like the following snipped:

```xml
  <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">

    <!--
      ...
    -->

    <!-- password hash algorithm -->
    <property name="passwordEncryptor">
      <bean class="org.camunda.bpm.unittest.Argon2HashAlgorithm" />
    </property>

  </bean>
```
For the complete example see [this repository](https://github.com/Zelldon/camunda-engine-unittest/tree/argon2-custom-hash). For further information's
about the password hashing in Camunda see the [documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/password-hashing/).


[1]: https://github.com/p-h-c/phc-winner-argon2
[2]: https://password-hashing.net/#argon2
[3]: https://github.com/phxql/argon2-jvm
